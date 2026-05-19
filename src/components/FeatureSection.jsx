export default function FeatureSection({ features }) {
    // Default data jika props features kosong
    const defaultFeatures = [
        { title: "Dashboard Interaktif", desc: "Pantau performa bisnis dengan visualisasi menarik." },
        { title: "Manajemen Pengguna", desc: "Atur hak akses staf dan pelanggan secara detail." },
        { title: "Laporan Real-time", desc: "Dapatkan data terkini untuk pengambilan keputusan." }
    ];

    const data = features || defaultFeatures;

    return (
        <section className="py-10 mb-10">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Fitur Unggulan</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {data.map((feat, index) => (
                    <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-center">
                        <h3 className="text-xl font-bold text-hijau mb-3">{feat.title}</h3>
                        <p className="text-gray-600">{feat.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}