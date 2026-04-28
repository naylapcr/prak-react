import React from "react";
import PageHeader from "../components/PageHeader";
import { ordersData } from "../data/mockData";


export default function Order () {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <PageHeader title="Orders" breadcrumb={["Dashboard", "Order data"]}>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md">Add Orders</button>
      </PageHeader>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b text-gray-400 text-sm">
              <th className="py-3 px-4 font-medium">Order ID</th>
              <th className="py-3 px-4 font-medium">Customer Name</th>
              <th className="py-3 px-4 font-medium">Status</th>
              <th className="py-3 px-4 font-medium">Total Price</th>
              <th className="py-3 px-4 font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {ordersData.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50 text-sm text-gray-700">
                <td className="py-4 px-4 font-semibold">{order.id}</td>
                <td className="py-4 px-4">{order.customerName}</td>
                <td className="py-4 px-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium 
                    ${order.status === 'Completed' ? 'bg-green-100 text-green-600' : 
                      order.status === 'Pending' ? 'bg-yellow-100 text-yellow-600' : 
                      'bg-red-100 text-red-600'}`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-4 px-4 font-medium">
                  {/* Memformat angka ke Rupiah dengan benar */}
                  Rp {Number(order.totalPrice).toLocaleString('id-ID')}
                </td>
                <td className="py-4 px-4 text-gray-500">{order.orderDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Order;