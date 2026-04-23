import React from "react";
import PageHeader from "../components/PageHeader";
import { customersData } from "../data/mockData";

const Customer = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <PageHeader title="Customers" breadcrumb={["Dashboard", "Customer list"]}>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700">
          + Add Customer
        </button>
      </PageHeader>

      <div className="overflow-x-auto mt-4">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b text-gray-400 text-sm">
              <th className="py-3 px-4 font-medium">Customer ID</th>
              <th className="py-3 px-4 font-medium">Customer Name</th>
              <th className="py-3 px-4 font-medium">Email</th>
              <th className="py-3 px-4 font-medium">Phone</th>
              <th className="py-3 px-4 font-medium">Loyalty</th>
            </tr>
          </thead>
          <tbody>
            {customersData.map((item) => (
              <tr key={item.customerID} className="border-b hover:bg-gray-50 text-sm text-gray-700">
                <td className="py-4 px-4 font-bold text-gray-900">{item.customerID}</td>
                <td className="py-4 px-4">{item.customerName}</td>
                <td className="py-4 px-4 text-blue-500 underline">{item.email}</td>
                <td className="py-4 px-4">{item.phone}</td>
                <td className="py-4 px-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold 
                    ${item.loyalty === 'Gold' ? 'bg-yellow-100 text-yellow-700' : 
                      item.loyalty === 'Silver' ? 'bg-gray-200 text-gray-700' : 
                      'bg-orange-100 text-orange-700'}`}>
                    {item.loyalty}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customer;