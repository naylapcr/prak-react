import React from "react";
import PageHeader from "../components/PageHeader";
import { ordersData } from "../data/mockData";

const Orders = () => {
  return (
    <div className="container">
      <PageHeader 
        title="Orders List" 
        breadcrumb={["Dashboard", "Orders"]}
      >
        <button className="btn btn-success" onClick={() => alert("Form Add Order")}>
          + Add Orders
        </button>
      </PageHeader>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Status</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {ordersData.map((order) => (
            <tr key={order.orderId}>
              <td>{order.orderId}</td>
              <td>{order.customerName}</td>
              <td>
                <span className={`badge ${order.status === 'Completed' ? 'bg-success' : 'bg-warning'}`}>
                  {order.status}
                </span>
              </td>
              <td>{order.totalPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;