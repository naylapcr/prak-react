import React, { useEffect, useState } from 'react';
import { FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { supabase } from "../services/supabaseClient";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState("");
  const [dataForm, setDataForm] = useState({ name: "", sku: "", price: "", stock: "" });
  const itemsPerPage = 8;

  const loadProducts = async () => {
    setLoading(true);
    setError("");

    const { data, error: fetchError } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (fetchError) {
      setError(fetchError.message);
    } else {
      setProducts(data || []);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const resetForm = () => {
    setEditingId("");
    setDataForm({ name: "", sku: "", price: "", stock: "" });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setLoading(true);
    setError("");

    const payload = {
      name: dataForm.name,
      sku: dataForm.sku,
      price: Number(dataForm.price),
      stock: Number(dataForm.stock),
    };

    const request = editingId
      ? supabase.from("products").update(payload).eq("id", editingId)
      : supabase.from("products").insert(payload);

    const { error: saveError } = await request;

    if (saveError) {
      setError(saveError.message);
    } else {
      resetForm();
      await loadProducts();
    }

    setLoading(false);
  };

  const startEdit = (product) => {
    setEditingId(product.id);
    setDataForm({
      name: product.name,
      sku: product.sku,
      price: product.price,
      stock: product.stock,
    });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Yakin ingin menghapus produk ini?");
    if (!confirmed) return;

    setLoading(true);
    setError("");

    const { error: deleteError } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (deleteError) {
      setError(deleteError.message);
    } else {
      await loadProducts();
    }

    setLoading(false);
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-xl font-black text-[#111827] tracking-tight">Stock Inventory</h3>
          <p className="text-xs text-gray-400 font-medium">Overlooking {products.length} catalog items</p>
        </div>
        <div className="relative w-full sm:w-72">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-xs" />
          <input
            type="text"
            placeholder="Search items..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-50 border border-transparent text-sm font-medium focus:bg-white focus:border-[#6366f1]/20 focus:ring-4 focus:ring-[#6366f1]/5 transition-all outline-none"
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      {error && (
        <div className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-3 rounded-2xl border border-gray-50 bg-gray-50/70 p-4">
        <input name="name" value={dataForm.name} onChange={handleChange} required placeholder="Product name" className="rounded-xl border border-gray-100 bg-white px-4 py-2 text-sm outline-none" />
        <input name="sku" value={dataForm.sku} onChange={handleChange} required placeholder="SKU" className="rounded-xl border border-gray-100 bg-white px-4 py-2 text-sm outline-none" />
        <input name="price" type="number" min="1" value={dataForm.price} onChange={handleChange} required placeholder="Price" className="rounded-xl border border-gray-100 bg-white px-4 py-2 text-sm outline-none" />
        <input name="stock" type="number" min="0" value={dataForm.stock} onChange={handleChange} required placeholder="Stock" className="rounded-xl border border-gray-100 bg-white px-4 py-2 text-sm outline-none" />
        <div className="flex gap-2">
          <button disabled={loading} className="flex-1 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white disabled:opacity-50">
            {editingId ? "Update" : "Add"}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} className="rounded-xl bg-white px-4 py-2 text-sm font-bold text-gray-500">
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="overflow-x-auto rounded-2xl border border-gray-50">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">SKU</th>
              <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Product</th>
              <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Price</th>
              <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Stock Status</th>
              <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {currentItems.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="p-4 text-xs font-black text-[#6366f1] tracking-wider">{product.sku}</td>
                <td className="p-4 text-sm font-bold text-[#111827] tracking-tight">
                  <Link to={`/admin/products/${product.id}`} className="text-emerald-400 hover:text-emerald-500">
                    {product.name}
                  </Link>
                </td>
                <td className="p-4 text-sm font-extrabold text-[#111827]">Rp {Number(product.price).toLocaleString("id-ID")}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${product.stock === 0 ? 'bg-red-500' : product.stock < 30 ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                    <span className={`text-xs font-bold ${product.stock === 0 ? 'text-red-500' : 'text-gray-700'}`}>
                      {product.stock === 0 ? 'Out of Stock' : `${product.stock} Units`}
                    </span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button onClick={() => startEdit(product)} className="text-xs font-bold text-blue-600">Edit</button>
                    <button onClick={() => handleDelete(product.id)} className="text-xs font-bold text-red-600">Delete</button>
                  </div>
                </td>
              </tr>
            ))}

            {currentItems.length === 0 && (
              <tr>
                <td colSpan="5" className="p-10 text-center text-sm font-medium text-gray-400 italic">
                  {loading ? "Loading products..." : "No products matched your search."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2 border-t border-gray-50">
          <p className="text-xs font-medium text-gray-400">
            Showing <span className="font-bold text-[#111827]">{indexOfFirstItem + 1}</span> to <span className="font-bold text-[#111827]">{Math.min(indexOfLastItem, filteredProducts.length)}</span> of {filteredProducts.length} entries
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2.5 rounded-xl border border-gray-100 text-gray-400 hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-transparent transition-all"
            >
              <FaChevronLeft className="text-xs" />
            </button>
            <span className="text-xs font-black px-4 text-[#111827]">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2.5 rounded-xl border border-gray-100 text-gray-400 hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-transparent transition-all"
            >
              <FaChevronRight className="text-xs" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
