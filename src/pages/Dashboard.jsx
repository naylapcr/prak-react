import React, { useState } from 'react'; 
import { FaShoppingCart, FaTruck, FaBan, FaDollarSign, FaSearch } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import RecentOrders from "../components/RecentOrders";

// --- DATA DUMMY ---
const initialOrders = [
    { id: "#12345", customer: "Ahmad Dani", menu: "Nasi Goreng", price: "Rp. 25.000", status: "Delivered" },
    { id: "#12346", customer: "Siti Aminah", menu: "Mie Ayam", price: "Rp. 18.000", status: "Pending" },
    { id: "#12347", customer: "Budi Utomo", menu: "Es Teh Manis", price: "Rp. 5.000", status: "Canceled" },
    { id: "#12348", customer: "Rina Rose", menu: "Jus Alpukat", price: "Rp. 15.000", status: "Delivered" },
];

export default function Dashboard() {
    // State untuk Search dan Filter sesuai Modul 5
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("All");

    // Logika Filtering Reaktif
    const filteredOrders = initialOrders.filter((order) => {
        const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              order.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === "All" || order.status === filterStatus;
        
        return matchesSearch && matchesStatus;
    });

    return (
        <div id="dashboard-container" className="flex flex-col space-y-6 pb-10">
            {/* 1. Header Halaman */}
            <PageHeader />

            {/* 2. Stats Cards dengan Hover Effect (Melayang & Ikon Miring) */}
            <div id="dashboard-grid" className="p-5 grid sm:grid-cols-2 md:grid-cols-4 gap-6">
                
                {/* Total Orders */}
                <div className="flex items-center space-x-5 bg-white rounded-2xl shadow-sm p-6 border border-gray-50 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group">
                    <div className="bg-hijau rounded-2xl p-4 group-hover:rotate-12 transition-transform duration-300">
                        <FaShoppingCart className="text-3xl text-white" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-3xl font-bold text-gray-800">75</span>
                        <span className="text-gray-400 text-sm">Total Orders</span>
                    </div>
                </div>

                {/* Total Delivered */}
                <div className="flex items-center space-x-5 bg-white rounded-2xl shadow-sm p-6 border border-gray-50 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group">
                    <div className="bg-hijau rounded-2xl p-4 group-hover:rotate-12 transition-transform duration-300">
                        <FaTruck className="text-3xl text-white" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-3xl font-bold text-gray-800">175</span>
                        <span className="text-gray-400 text-sm">Total Delivered</span>
                    </div>
                </div>

                {/* Total Canceled */}
                <div className="flex items-center space-x-5 bg-white rounded-2xl shadow-sm p-6 border border-gray-50 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group">
                    <div className="bg-merah rounded-2xl p-4 group-hover:rotate-12 transition-transform duration-300">
                        <FaBan className="text-3xl text-white" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-3xl font-bold text-gray-800">40</span>
                        <span className="text-gray-400 text-sm">Total Canceled</span>
                    </div>
                </div>

                {/* Total Revenue */}
                <div className="flex items-center space-x-5 bg-white rounded-2xl shadow-sm p-6 border border-gray-50 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group">
                    <div className="bg-biru rounded-2xl p-4 group-hover:rotate-12 transition-transform duration-300">
                        <FaDollarSign className="text-3xl text-white" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-3xl font-bold text-gray-800">Rp.128k</span>
                        <span className="text-gray-400 text-sm">Total Revenue</span>
                    </div>
                </div>
            </div>

            {/* 3. Search & Filter Bar Bar */}
            <div className="px-5 flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <input 
                        type="text"
                        value={searchTerm}
                        placeholder="Cari ID atau Nama Customer..."
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-hijau outline-none transition-all bg-white shadow-sm"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
                <select 
                    value={filterStatus}
                    className="px-6 py-3 rounded-xl border border-gray-200 bg-white shadow-sm outline-none focus:ring-2 focus:ring-hijau font-medium text-gray-600 cursor-pointer"
                    onChange={(e) => setFilterStatus(e.target.value)}
                >
                    <option value="All">Semua Status</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Pending">Pending</option>
                    <option value="Canceled">Canceled</option>
                </select>
            </div>

            {/* 4. Recent Orders Table dengan Hover & Empty State */}
            <div className="px-5">
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-50">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Order Request</h2>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-separate border-spacing-y-3">
                            <thead>
                                <tr className="text-gray-400 text-sm uppercase tracking-wider font-semibold">
                                    <th className="pb-4 pl-6">Order ID</th>
                                    <th className="pb-4">Customer</th>
                                    <th className="pb-4">Menu Item</th>
                                    <th className="pb-4">Price</th>
                                    <th className="pb-4 text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredOrders.length > 0 ? (
                                    filteredOrders.map((order) => (
                                        <tr 
                                            key={order.id} 
                                            className="bg-gray-50 hover:bg-white hover:shadow-2xl hover:-translate-y-1.5 hover:scale-[1.01] transition-all duration-300 ease-out cursor-pointer group"
                                        >
                                            <td className="py-5 pl-6 rounded-l-2xl font-bold text-gray-700">{order.id}</td>
                                            <td className="py-5 font-medium text-gray-800">{order.customer}</td>
                                            <td className="py-5 text-gray-600">{order.menu}</td>
                                            <td className="py-5 font-bold text-gray-900">{order.price}</td>
                                            <td className="py-5 rounded-r-2xl text-center">
                                                <span className={`px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-widest transition-transform duration-300 group-hover:scale-110 inline-block
                                                    ${order.status === 'Delivered' ? 'bg-green-100 text-green-600' : 
                                                      order.status === 'Pending' ? 'bg-yellow-100 text-yellow-600' : 
                                                      'bg-red-100 text-red-600'}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    /* Empty State Animasi */
                                    <tr>
                                        <td colSpan="5" className="py-20 text-center">
                                            <div className="flex flex-col items-center justify-center space-y-4">
                                                <div className="bg-gray-100 p-6 rounded-full animate-bounce">
                                                    <FaSearch className="text-5xl text-gray-300" />
                                                </div>
                                                <h3 className="text-xl font-bold text-gray-700">Data Tidak Ditemukan</h3>
                                                <button 
                                                    onClick={() => {setSearchTerm(""); setFilterStatus("All")}}
                                                    className="bg-hijau text-white px-6 py-2 rounded-xl shadow-lg hover:brightness-90 transition-all"
                                                >
                                                    Reset Filter
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}