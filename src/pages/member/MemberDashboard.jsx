import { useEffect, useMemo, useState } from "react"
import PageHeader from "../../components/PageHeader"
import { supabase } from "../../services/supabaseClient"
import { useAuth } from "../../contexts/AuthContext"

const tierDiscount = {
    bronze: 0.05,
    silver: 0.10,
    gold: 0.15,
    platinum: 0.20,
}

export default function MemberDashboard() {
    const { user, profile, refreshProfile } = useAuth()
    const [products, setProducts] = useState([])
    const [orders, setOrders] = useState([])
    const [quantities, setQuantities] = useState({})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const loadData = async () => {
        setLoading(true)
        setError("")

        const [{ data: productData, error: productError }, { data: orderData, error: orderError }] = await Promise.all([
            supabase.from("products").select("*").order("created_at", { ascending: false }),
            supabase
                .from("orders")
                .select("*, order_items(quantity, price_at_purchase, products(name, sku))")
                .eq("user_id", user.id)
                .order("created_at", { ascending: false }),
        ])

        if (productError || orderError) {
            setError(productError?.message || orderError?.message)
        } else {
            setProducts(productData || [])
            setOrders(orderData || [])
        }

        setLoading(false)
    }

    useEffect(() => {
        if (user?.id) loadData()
    }, [user?.id])

    const selectedItems = useMemo(() => {
        return products
            .map((product) => ({
                ...product,
                quantity: Number(quantities[product.id] || 0),
            }))
            .filter((product) => product.quantity > 0)
    }, [products, quantities])

    const totalOriginal = selectedItems.reduce((total, product) => {
        return total + Number(product.price) * product.quantity
    }, 0)

    const discountPercent = tierDiscount[profile?.tier || "bronze"] || 0
    const discountAmount = Math.floor(totalOriginal * discountPercent)
    const totalFinal = totalOriginal - discountAmount
    const estimatedPoints = Math.floor(totalFinal / 10000)

    const handleQuantityChange = (product, value) => {
        const nextValue = Math.max(0, Math.min(Number(value), product.stock))
        setQuantities({ ...quantities, [product.id]: nextValue })
    }

    const handleCreateOrder = async () => {
        if (selectedItems.length === 0) {
            setError("Pilih minimal satu produk terlebih dahulu.")
            return
        }

        setLoading(true)
        setError("")
        setSuccess("")

        const { data: order, error: orderError } = await supabase
            .from("orders")
            .insert({
                user_id: user.id,
                total_original: totalOriginal,
                discount_amount: discountAmount,
                total_final: totalFinal,
                points_earned: 0,
                status: "pending",
            })
            .select()
            .single()

        if (orderError) {
            setError(orderError.message)
            setLoading(false)
            return
        }

        const itemsPayload = selectedItems.map((product) => ({
            order_id: order.id,
            product_id: product.id,
            quantity: product.quantity,
            price_at_purchase: product.price,
        }))

        const { error: itemError } = await supabase
            .from("order_items")
            .insert(itemsPayload)

        if (itemError) {
            setError(itemError.message)
        } else {
            setSuccess("Pesanan berhasil dibuat dan menunggu konfirmasi admin.")
            setQuantities({})
            await refreshProfile()
            await loadData()
        }

        setLoading(false)
    }

    return (
        <div className="pb-10 space-y-6">
            <PageHeader title="Member Dashboard" breadcrumb={["Member", "Dashboard"]} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl shadow-sm p-6">
                    <p className="text-gray-400 text-sm font-medium">Tier</p>
                    <h3 className="text-2xl font-black capitalize text-gray-800">{profile?.tier}</h3>
                </div>
                <div className="bg-white rounded-2xl shadow-sm p-6">
                    <p className="text-gray-400 text-sm font-medium">Total Points</p>
                    <h3 className="text-2xl font-black text-gray-800">{profile?.total_points || 0}</h3>
                </div>
                <div className="bg-white rounded-2xl shadow-sm p-6">
                    <p className="text-gray-400 text-sm font-medium">Diskon Aktif</p>
                    <h3 className="text-2xl font-black text-gray-800">{Math.round(discountPercent * 100)}%</h3>
                </div>
            </div>

            {error && <div className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">{error}</div>}
            {success && <div className="rounded-xl bg-green-50 px-4 py-3 text-sm font-medium text-green-600">{success}</div>}

            <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800">Katalog Produk</h2>
                    <button
                        onClick={handleCreateOrder}
                        disabled={loading || selectedItems.length === 0}
                        className="bg-hijau text-white px-4 py-2 rounded-md text-sm font-bold disabled:opacity-50"
                    >
                        Buat Pesanan
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b text-gray-400 text-sm">
                                <th className="py-3 px-4 font-medium">SKU</th>
                                <th className="py-3 px-4 font-medium">Product</th>
                                <th className="py-3 px-4 font-medium">Price</th>
                                <th className="py-3 px-4 font-medium">Stock</th>
                                <th className="py-3 px-4 font-medium">Qty</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id} className="border-b hover:bg-gray-50 text-sm text-gray-700">
                                    <td className="py-4 px-4 font-bold text-[#6366f1]">{product.sku}</td>
                                    <td className="py-4 px-4 font-semibold">{product.name}</td>
                                    <td className="py-4 px-4 font-bold">Rp {Number(product.price).toLocaleString("id-ID")}</td>
                                    <td className="py-4 px-4">{product.stock}</td>
                                    <td className="py-4 px-4">
                                        <input
                                            type="number"
                                            min="0"
                                            max={product.stock}
                                            value={quantities[product.id] || ""}
                                            onChange={(evt) => handleQuantityChange(product, evt.target.value)}
                                            className="w-20 rounded-lg border border-gray-200 px-3 py-2"
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-4 gap-3 text-sm">
                    <div className="rounded-xl bg-gray-50 p-4">
                        <p className="text-gray-400">Subtotal</p>
                        <p className="font-black">Rp {totalOriginal.toLocaleString("id-ID")}</p>
                    </div>
                    <div className="rounded-xl bg-gray-50 p-4">
                        <p className="text-gray-400">Diskon</p>
                        <p className="font-black">Rp {discountAmount.toLocaleString("id-ID")}</p>
                    </div>
                    <div className="rounded-xl bg-gray-50 p-4">
                        <p className="text-gray-400">Total</p>
                        <p className="font-black">Rp {totalFinal.toLocaleString("id-ID")}</p>
                    </div>
                    <div className="rounded-xl bg-gray-50 p-4">
                        <p className="text-gray-400">Estimasi Poin</p>
                        <p className="font-black">{estimatedPoints}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Riwayat Pesanan</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b text-gray-400 text-sm">
                                <th className="py-3 px-4 font-medium">Order ID</th>
                                <th className="py-3 px-4 font-medium">Status</th>
                                <th className="py-3 px-4 font-medium">Total</th>
                                <th className="py-3 px-4 font-medium">Points</th>
                                <th className="py-3 px-4 font-medium">Items</th>
                                <th className="py-3 px-4 font-medium">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id} className="border-b hover:bg-gray-50 text-sm text-gray-700">
                                    <td className="py-4 px-4 font-semibold">{order.id.slice(0, 8)}</td>
                                    <td className="py-4 px-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium
                                            ${order.status === 'completed' ? 'bg-green-100 text-green-600' :
                                            order.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                                            'bg-red-100 text-red-600'}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4 font-bold">Rp {Number(order.total_final).toLocaleString("id-ID")}</td>
                                    <td className="py-4 px-4">{order.points_earned}</td>
                                    <td className="py-4 px-4">
                                        {(order.order_items || []).map((item) => item.products?.name).join(", ") || "-"}
                                    </td>
                                    <td className="py-4 px-4 text-gray-500">
                                        {new Date(order.created_at).toLocaleDateString("id-ID")}
                                    </td>
                                </tr>
                            ))}
                            {!loading && orders.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="py-8 text-center text-gray-400">
                                        Belum ada riwayat pesanan.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
