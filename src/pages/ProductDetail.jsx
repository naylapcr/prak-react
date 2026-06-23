import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { supabase } from "../services/supabaseClient"

export default function ProductDetail() {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        const loadProduct = async () => {
            const { data, error: fetchError } = await supabase
                .from("products")
                .select("*")
                .eq("id", id)
                .single()

            if (fetchError) {
                setError(fetchError.message)
                return
            }

            setProduct(data)
        }

        loadProduct()
    }, [id])

    if (error) return <div className="text-red-600 p-4">{error}</div>
    if (!product) return <div className="p-4">Loading...</div>

    return (
        <div className="p-6 bg-white rounded-xl shadow-lg max-w-lg mx-auto mt-6">
            <div className="rounded-xl mb-4 w-full h-48 bg-emerald-50 flex items-center justify-center">
                <span className="text-5xl font-black text-emerald-200">{product.sku}</span>
            </div>
            <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-1">SKU: {product.sku}</p>
            <p className="text-gray-600 mb-1">Stock: {product.stock} units</p>
            <p className="text-gray-800 font-semibold text-lg">
                Harga: Rp {Number(product.price).toLocaleString("id-ID")}
            </p>
        </div>
    )
}
