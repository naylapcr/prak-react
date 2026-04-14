import React from 'react';

const orderData = [
    { id: "#12345", customer: "Ahmad Dani", menu: "Nasi Goreng Spesial", price: "Rp. 25.000", status: "Delivered" },
    { id: "#12346", customer: "Siti Aminah", menu: "Mie Ayam Bakso", price: "Rp. 18.000", status: "Pending" },
    { id: "#12347", customer: "Budi Utomo", menu: "Es Teh Manis", price: "Rp. 5.000", status: "Canceled" },
];

export default function RecentOrders() {
    return (
        <div id="recent-orders-container" className="mt-8 bg-white p-6 rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Recent Orders</h2>
                <button className="text-hijau font-semibold hover:underline">View All</button>
            </div>
            
            <div className="overflow-x-auto">
                <table className="w-full text-left border-separate border-spacing-y-2">
                    <thead>
                        <tr className="text-gray-400 text-sm">
                            <th className="pb-4 pl-4 font-medium">Order ID</th>
                            <th className="pb-4 font-medium">Customer</th>
                            <th className="pb-4 font-medium">Menu</th>
                            <th className="pb-4 font-medium">Price</th>
                            <th className="pb-4 font-medium">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderData.map((order) => (
                            <tr key={order.id} className="bg-gray-50 hover:bg-green-50 transition-colors duration-200 group cursor-pointer">
                                <td className="py-4 pl-4 rounded-l-xl font-bold text-gray-700">{order.id}</td>
                                <td className="py-4 text-gray-600">{order.customer}</td>
                                <td className="py-4 text-gray-600">{order.menu}</td>
                                <td className="py-4 font-semibold text-gray-800">{order.price}</td>
                                <td className="py-4 rounded-r-xl">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold 
                                        ${order.status === 'Delivered' ? 'bg-green-100 text-green-600' : 
                                          order.status === 'Pending' ? 'bg-yellow-100 text-yellow-600' : 
                                          'bg-red-100 text-red-600'}`}>
                                        {order.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}