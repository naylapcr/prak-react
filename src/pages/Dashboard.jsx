import { useEffect, useState } from "react";
import { FaShoppingCart, FaTruck, FaBan, FaDollarSign, FaEye } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import Card from "../components/Card";
import Table from "../components/Table";
import Alert from "../components/Alert";
import { supabase } from "../services/supabaseClient";

export default function Dashboard() {
    const [filter, setFilter] = useState("All");
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadOrders = async () => {
            const { data, error: fetchError } = await supabase
                .from("orders")
                .select("*, profiles(full_name)")
                .order("created_at", { ascending: false })
                .limit(8);

            if (fetchError) {
                setError(fetchError.message);
            } else {
                setOrders(data || []);
            }
        };

        loadOrders();
    }, []);

    const filteredOrders = filter === "All"
        ? orders
        : orders.filter(order => order.status === filter.toLowerCase());

    const deliveredOrders = orders.filter(order => order.status === "completed");
    const canceledOrders = orders.filter(order => order.status === "cancelled");
    const revenue = deliveredOrders.reduce((total, order) => total + Number(order.total_final), 0);

    return (
        <div id="dashboard-container" className="pb-10">
            <PageHeader title="Dashboard" breadcrumb={["Dashboard"]} />

            {error && <Alert type="danger">{error}</Alert>}

            <div id="dashboard-grid" className="mb-5 grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                    <div className="flex items-center space-x-5">
                        <div className="bg-green-500 rounded-full p-4 text-white shadow-lg shadow-green-100">
                            <FaShoppingCart className="text-xl" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-bold text-gray-800">{orders.length}</span>
                            <span className="text-gray-400 text-sm font-medium">Total Orders</span>
                        </div>
                    </div>
                </Card>

                <Card>
                    <div className="flex items-center space-x-5">
                        <div className="bg-blue-500 rounded-full p-4 text-white shadow-lg shadow-blue-100">
                            <FaTruck className="text-xl" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-bold text-gray-800">{deliveredOrders.length}</span>
                            <span className="text-gray-400 text-sm font-medium">Total Delivered</span>
                        </div>
                    </div>
                </Card>

                <Card>
                    <div className="flex items-center space-x-5">
                        <div className="bg-red-500 rounded-full p-4 text-white shadow-lg shadow-red-100">
                            <FaBan className="text-xl" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-bold text-gray-800">{canceledOrders.length}</span>
                            <span className="text-gray-400 text-sm font-medium">Total Canceled</span>
                        </div>
                    </div>
                </Card>

                <Card>
                    <div className="flex items-center space-x-5">
                        <div className="bg-yellow-400 rounded-full p-4 text-white shadow-lg shadow-yellow-100">
                            <FaDollarSign className="text-xl" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-bold text-gray-800">Rp {revenue.toLocaleString("id-ID")}</span>
                            <span className="text-gray-400 text-sm font-medium">Total Revenue</span>
                        </div>
                    </div>
                </Card>
            </div>

            <div className="mb-6 flex space-x-3">
                {["All", "Pending", "Completed", "Cancelled"].map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`px-5 py-2 rounded-lg font-bold transition-all text-sm border ${
                            filter === cat
                            ? "bg-hijau text-white border-hijau shadow-md"
                            : "bg-white text-gray-400 border-gray-100 hover:bg-gray-50"
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800">Recent Orders ({filter})</h2>
                    <button className="text-hijau font-semibold hover:underline text-sm">View All</button>
                </div>

                {filteredOrders.length > 0 ? (
                    <Table headers={["Order ID", "Customer", "Status", "Original", "Total", "Action"]}>
                        {filteredOrders.map((order) => (
                            <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                <td className="py-4 font-bold text-gray-700">{order.id.slice(0, 8)}</td>
                                <td className="py-4 text-gray-600">{order.profiles?.full_name || "-"}</td>
                                <td className="py-4">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                                        order.status === 'completed' ? 'bg-green-100 text-green-600' :
                                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                                        'bg-red-100 text-red-600'
                                    }`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="py-4 font-bold text-gray-900">Rp {Number(order.total_original).toLocaleString("id-ID")}</td>
                                <td className="py-4 font-bold text-gray-900">Rp {Number(order.total_final).toLocaleString("id-ID")}</td>
                                <td className="py-4 text-center">
                                    <button className="p-2 bg-gray-50 rounded-lg text-hijau hover:bg-hijau hover:text-white transition-all shadow-sm">
                                        <FaEye />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </Table>
                ) : (
                    <Alert type="info">
                        Tidak ada pesanan untuk kategori "{filter}".
                    </Alert>
                )}
            </div>
        </div>
    );
}
