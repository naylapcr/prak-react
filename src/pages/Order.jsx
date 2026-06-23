import React, { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { supabase } from "../services/supabaseClient";

export default function Order () {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadOrders = async () => {
    setLoading(true);
    setError("");

    const { data, error: fetchError } = await supabase
      .from("orders")
      .select("*, profiles(full_name), order_items(quantity, price_at_purchase, products(name, sku))")
      .order("created_at", { ascending: false });

    if (fetchError) {
      setError(fetchError.message);
    } else {
      setOrders(data || []);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleStatusChange = async (orderId, status) => {
    setLoading(true);
    setError("");

    const currentOrder = orders.find((order) => order.id === orderId);
    if (currentOrder?.status !== "pending") {
      setError("Status hanya dapat diubah dari pending ke completed atau cancelled.");
      return;
    }

    const { error: updateError } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", orderId);

    if (updateError) {
      setError(updateError.message);
    } else {
      await loadOrders();
    }

    setLoading(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <PageHeader title="Orders" breadcrumb={["Dashboard", "Order data"]}>
        <button
          onClick={loadOrders}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-md disabled:opacity-50"
        >
          {loading ? "Loading..." : "Refresh"}
        </button>
      </PageHeader>

      {error && (
        <div className="mb-4 rounded-md bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b text-gray-400 text-sm">
              <th className="py-3 px-4 font-medium">Order ID</th>
              <th className="py-3 px-4 font-medium">Customer Name</th>
              <th className="py-3 px-4 font-medium">Status</th>
              <th className="py-3 px-4 font-medium">Original</th>
              <th className="py-3 px-4 font-medium">Discount</th>
              <th className="py-3 px-4 font-medium">Total Price</th>
              <th className="py-3 px-4 font-medium">Points</th>
              <th className="py-3 px-4 font-medium">Items</th>
              <th className="py-3 px-4 font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50 text-sm text-gray-700">
                <td className="py-4 px-4 font-semibold">{order.id.slice(0, 8)}</td>
                <td className="py-4 px-4">{order.profiles?.full_name || "-"}</td>
                <td className="py-4 px-4">
                  <select
                    value={order.status}
                    onChange={(evt) => handleStatusChange(order.id, evt.target.value)}
                    disabled={loading || order.status !== "pending"}
                    className={`px-3 py-1 rounded-full text-xs font-medium border-0 outline-none
                    ${order.status === 'completed' ? 'bg-green-100 text-green-600' :
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-red-100 text-red-600'}`}
                  >
                    <option value="pending">pending</option>
                    <option value="completed">completed</option>
                    <option value="cancelled">cancelled</option>
                  </select>
                </td>
                <td className="py-4 px-4 font-medium">
                  Rp {Number(order.total_original).toLocaleString('id-ID')}
                </td>
                <td className="py-4 px-4 font-medium">
                  Rp {Number(order.discount_amount).toLocaleString('id-ID')}
                </td>
                <td className="py-4 px-4 font-medium">
                  Rp {Number(order.total_final).toLocaleString('id-ID')}
                </td>
                <td className="py-4 px-4">{order.points_earned}</td>
                <td className="py-4 px-4">
                  {(order.order_items || [])
                    .map((item) => `${item.products?.name || "-"} x${item.quantity}`)
                    .join(", ") || "-"}
                </td>
                <td className="py-4 px-4 text-gray-500">
                  {new Date(order.created_at).toLocaleDateString("id-ID")}
                </td>
              </tr>
            ))}
            {!loading && orders.length === 0 && (
              <tr>
                <td colSpan="9" className="py-8 text-center text-gray-400">
                  Belum ada pesanan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
