import { useState } from "react";
import { FaShoppingCart, FaTruck, FaBan, FaDollarSign, FaEye } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import Card from "../components/Card";
import Badge from "../components/Badge";
import Table from "../components/Table";
import Alert from "../components/Alert";

export default function Dashboard() {
    const [filter, setFilter] = useState("All");

    const recentOrders = [
        { 
            id: "#12341", name: "Rizky Ridho", menu: "Ayam Bakar", category: "Food", 
            status: "Delivered", price: "Rp 25.000",
            image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=100&h=100&fit=crop" 
        },
        { 
            id: "#12342", name: "Siti Aminah", menu: "Nasi Goreng", category: "Food", 
            status: "Pending", price: "Rp 15.000",
            image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=100&h=100&fit=crop"
        },
        { 
            id: "#12343", name: "Budi Santoso", menu: "Es Teh Manis", category: "Drink", 
            status: "Canceled", price: "Rp 5.000",
            image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=100&h=100&fit=crop"
        },
        { 
            id: "#12344", name: "Andi", menu: "Jus Jeruk", category: "Drink", 
            status: "Delivered", price: "Rp 10.000",
            image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=100&h=100&fit=crop"
        },
    ];

    const filteredOrders = filter === "All" 
        ? recentOrders 
        : recentOrders.filter(order => order.category === filter);

    return (
        <div id="dashboard-container" className="pb-10">
            
            <PageHeader title="Dashboard" breadcrumb={["Dashboard"]} />

            {/* Grid Statistik */}
            <div id="dashboard-grid" className="mb-5 grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                    <div className="flex items-center space-x-5">
                        <div className="bg-green-500 rounded-full p-4 text-white shadow-lg shadow-green-100">
                            <FaShoppingCart className="text-xl" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-bold text-gray-800">75</span>
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
                            <span className="text-2xl font-bold text-gray-800">175</span>
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
                            <span className="text-2xl font-bold text-gray-800">40</span>
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
                            <span className="text-2xl font-bold text-gray-800">Rp.128</span>
                            <span className="text-gray-400 text-sm font-medium">Total Revenue</span>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Filter Buttons */}
            <div className="mb-6 flex space-x-3">
                {["All", "Food", "Drink"].map((cat) => (
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

            {/* Tabel Pesanan Terbaru */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800">Recent Orders ({filter})</h2>
                    {/* Mengembalikan tombol View All seperti desain asli */}
                    <button className="text-hijau font-semibold hover:underline text-sm">View All</button>
                </div>

                {filteredOrders.length > 0 ? (
                    <Table headers={["Order ID", "Menu", "Customer", "Status", "Price", "Action"]}>
                        {filteredOrders.map((order, index) => (
                            <tr key={index} className="hover:bg-gray-50 transition-colors">
                                <td className="py-4 font-bold text-gray-700">{order.id}</td>
                                
                                <td className="py-4 flex items-center space-x-3">
                                    <img 
                                        src={order.image} 
                                        alt={order.menu} 
                                        className="w-10 h-10 rounded-lg object-cover shadow-sm"
                                    />
                                    <span className="font-semibold text-gray-800">{order.menu}</span>
                                </td>
                                
                                {/* Avatar dihapus, dikembalikan ke teks biasa */}
                                <td className="py-4 text-gray-600">{order.name}</td>
                                
                                <td className="py-4">
                                    {/* Memastikan style Badge sesuai dengan gambar awal */}
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                                        order.status === 'Delivered' ? 'bg-green-100 text-green-600' :
                                        order.status === 'Pending' ? 'bg-yellow-100 text-yellow-600' :
                                        'bg-red-100 text-red-600'
                                    }`}>
                                        {order.status}
                                    </span>
                                </td>
                                
                                <td className="py-4 font-bold text-gray-900">{order.price}</td>
                                
                                <td className="py-4 text-center">
                                    {/* Tombol aksi dikembalikan ke desain asli */}
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