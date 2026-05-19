export default function ProductSection({ title, children }) {
    return (
        <section className="py-10 mb-10">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">{title || "Daftar Produk"}</h2>
                <button className="text-hijau font-semibold hover:underline">
                    Lihat Semua &rarr;
                </button>
            </div>
            
            {/* Tempat untuk merender ProductCard.jsx yang sudah kamu buat sebelumnya */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {children}
            </div>
        </section>
    );
}