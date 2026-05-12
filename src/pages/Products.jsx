import React, { useState } from 'react';
import { FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import ProductsData from "../data/Products.json";
import PageHeader from "../components/PageHeader";
import { Link } from 'react-router-dom';

export default function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;


  // Filter Data berdasarkan input pencarian (Judul, Kode, atau Kategori)
  const filteredProducts = ProductsData.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Logika Pagination Sederhana
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm space-y-6">

      {/* Bagian Atas: Cari Produk */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-xl font-black text-[#111827] tracking-tight">Stock Inventory</h3>
          <p className="text-xs text-gray-400 font-medium">Overlooking {ProductsData.length} catalog items</p>
        </div>
        <div className="relative w-full sm:w-72">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-xs" />
          <input
            type="text"
            placeholder="Search items..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-50 border border-transparent text-sm font-medium focus:bg-white focus:border-[#6366f1]/20 focus:ring-4 focus:ring-[#6366f1]/5 transition-all outline-none"
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset ke halaman 1 saat mengetik
            }}
          />
        </div>
      </div>

      {/* Kontainer Tabel Utama */}
      <div className="overflow-x-auto rounded-2xl border border-gray-50">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Code</th>
              <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Product</th>
              <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Category</th>
              <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Brand</th>
              <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Price</th>
              <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Stock Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {currentItems.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="p-4 text-xs font-black text-[#6366f1] tracking-wider">{product.code}</td>
                <td className="p-4 text-sm font-bold text-[#111827] tracking-tight"> <Link to={`/products/${product.id}`} className="text-emerald-400 hover:text-emerald-500">
                  {product.title}
                </Link></td>
                <td className="p-4">
                  <span className="px-2.5 py-1 rounded-md bg-gray-100 text-gray-600 text-[10px] font-black uppercase tracking-wider">
                    {product.category}
                  </span>
                </td>
                <td className="p-4 text-xs font-medium text-gray-500">{product.brand}</td>
                <td className="p-4 text-sm font-extrabold text-[#111827]">Rp {product.price.toLocaleString()}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${product.stock === 0 ? 'bg-red-500' : product.stock < 30 ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                    <span className={`text-xs font-bold ${product.stock === 0 ? 'text-red-500' : 'text-gray-700'}`}>
                      {product.stock === 0 ? 'Out of Stock' : `${product.stock} Units`}
                    </span>
                  </div>
                </td>
              </tr>
            ))}

            {/* Keadaan jika data kosong setelah dicari */}
            {currentItems.length === 0 && (
              <tr>
                <td colSpan="6" className="p-10 text-center text-sm font-medium text-gray-400 italic">
                  No products matched your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Bagian Bawah: Pagination Navigasi */}
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