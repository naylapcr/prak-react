import React, { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { supabase } from "../services/supabaseClient";

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState("");
  const [editForm, setEditForm] = useState({ full_name: "", tier: "bronze", total_points: 0 });

  const loadCustomers = async () => {
    setLoading(true);
    setError("");

    const { data, error: fetchError } = await supabase
      .from("profiles")
      .select("id, full_name, role, tier, total_points, created_at")
      .eq("role", "member")
      .order("created_at", { ascending: false });

    if (fetchError) {
      setError(fetchError.message);
    } else {
      setCustomers(data || []);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const startEdit = (item) => {
    setEditingId(item.id);
    setEditForm({
      full_name: item.full_name,
      tier: item.tier,
      total_points: item.total_points,
    });
  };

  const handleUpdate = async (id) => {
    setLoading(true);
    setError("");

    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        full_name: editForm.full_name,
        tier: editForm.tier,
        total_points: Number(editForm.total_points),
      })
      .eq("id", id);

    if (updateError) {
      setError(updateError.message);
    } else {
      setEditingId("");
      await loadCustomers();
    }

    setLoading(false);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Yakin ingin menghapus member ini?");
    if (!confirmed) return;

    setLoading(true);
    setError("");

    const { error: deleteError } = await supabase
      .from("profiles")
      .delete()
      .eq("id", id);

    if (deleteError) {
      setError(deleteError.message);
    } else {
      await loadCustomers();
    }

    setLoading(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <PageHeader title="Customers" breadcrumb={["Dashboard", "Customer list"]}>
        <button
          onClick={loadCustomers}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Loading..." : "Refresh"}
        </button>
      </PageHeader>

      {error && (
        <div className="mb-4 rounded-md bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="overflow-x-auto mt-4">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b text-gray-400 text-sm">
              <th className="py-3 px-4 font-medium">Customer ID</th>
              <th className="py-3 px-4 font-medium">Customer Name</th>
              <th className="py-3 px-4 font-medium">Tier</th>
              <th className="py-3 px-4 font-medium">Points</th>
              <th className="py-3 px-4 font-medium">Joined</th>
              <th className="py-3 px-4 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50 text-sm text-gray-700">
                <td className="py-4 px-4 font-bold text-gray-900">{item.id.slice(0, 8)}</td>
                <td className="py-4 px-4">
                  {editingId === item.id ? (
                    <input
                      value={editForm.full_name}
                      onChange={(evt) => setEditForm({ ...editForm, full_name: evt.target.value })}
                      className="border rounded-md px-3 py-2 w-full"
                    />
                  ) : (
                    item.full_name
                  )}
                </td>
                <td className="py-4 px-4">
                  {editingId === item.id ? (
                    <select
                      value={editForm.tier}
                      onChange={(evt) => setEditForm({ ...editForm, tier: evt.target.value })}
                      className="border rounded-md px-3 py-2"
                    >
                      <option value="bronze">bronze</option>
                      <option value="silver">silver</option>
                      <option value="gold">gold</option>
                      <option value="platinum">platinum</option>
                    </select>
                  ) : (
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold 
                      ${item.tier === 'gold' ? 'bg-yellow-100 text-yellow-700' :
                        item.tier === 'silver' ? 'bg-gray-200 text-gray-700' :
                        item.tier === 'platinum' ? 'bg-purple-100 text-purple-700' :
                        'bg-orange-100 text-orange-700'}`}>
                      {item.tier}
                    </span>
                  )}
                </td>
                <td className="py-4 px-4">
                  {editingId === item.id ? (
                    <input
                      type="number"
                      min="0"
                      value={editForm.total_points}
                      onChange={(evt) => setEditForm({ ...editForm, total_points: evt.target.value })}
                      className="border rounded-md px-3 py-2 w-24"
                    />
                  ) : (
                    item.total_points
                  )}
                </td>
                <td className="py-4 px-4 text-gray-500">
                  {new Date(item.created_at).toLocaleDateString("id-ID")}
                </td>
                <td className="py-4 px-4">
                  {editingId === item.id ? (
                    <div className="flex gap-2">
                      <button onClick={() => handleUpdate(item.id)} className="text-green-600 font-semibold">Save</button>
                      <button onClick={() => setEditingId("")} className="text-gray-500 font-semibold">Cancel</button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <button onClick={() => startEdit(item)} className="text-blue-600 font-semibold">Edit</button>
                      <button onClick={() => handleDelete(item.id)} className="text-red-600 font-semibold">Delete</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {!loading && customers.length === 0 && (
              <tr>
                <td colSpan="6" className="py-8 text-center text-gray-400">
                  Belum ada member.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customer;
