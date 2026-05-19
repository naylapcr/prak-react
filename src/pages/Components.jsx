import PageHeader from "../components/PageHeader";
import { FaEye, FaTrash, FaEdit } from "react-icons/fa";

// 1. Basic Components
import Button from "../components/Button";
import Badge from "../components/Badge";
import Avatar from "../components/Avatar";

// 2. Layout Components
import Container from "../components/Container";
import Card from "../components/Card";

// 3. Complex Components
import ProductCard from "../components/ProductCard";
import Table from "../components/Table";

// 4. Form Components (Pastikan file ini sudah ada atau buat nanti)
import InputField from "../components/InputField";
import TextArea from "../components/TextArea";
import SelectField from "../components/SelectField";

// 5. Feedback Components
import Alert from "../components/Alert";
import Modal from "../components/Modal"; // Jika belum ada, bisa di-comment dulu
import Loading from "../components/Loading"; // Jika belum ada, bisa di-comment dulu

// 6. Section Components (Biasanya berukuran besar, kita simulasikan)
import HeroSection from "../components/HeroSection"; 
import FeatureSection from "../components/FeatureSection";
import ProductSection from "../components/ProductSection";

export default function Components() {
    // Data untuk Table Component
    const tableHeaders = ["No", "Nama Produk", "Kategori", "Harga", "Aksi"];
    const tableProducts = [
        { id: 1, name: "Laptop Asus", category: "Elektronik", price: "Rp 8.000.000" },
        { id: 2, name: "Sepatu Sport", category: "Fashion", price: "Rp 450.000" },
        { id: 3, name: "Jam Tangan", category: "Aksesoris", price: "Rp 799.000" }
    ];

    return (
        <div className="pb-10">
            <PageHeader title="Components Catalog" breadcrumb={["Dashboard", "Components"]} />

            {/* Intro Section */}
            <div className="mx-5 p-6 bg-white rounded-2xl shadow-sm mt-4 mb-8 border-l-4 border-hijau">
                <h2 className="text-xl font-bold mb-2 text-gray-800">Katalog Semua Komponen</h2>
                <p className="text-gray-500 text-sm leading-relaxed">
                    Kumpulan komponen yang siap pakai. Tinggal copy-paste pemanggilannya!
                </p>
            </div>

            <div className="mx-5 grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* =========================================
                    1. BASIC & UI COMPONENTS
                ========================================= */}
                <div className="flex flex-col space-y-3">
                    <h3 className="font-bold text-gray-700 border-b pb-2">1. Basic Components</h3>
                    
                    <Card>
                        <h4 className="font-bold text-sm text-gray-400 mb-3 uppercase">Button Component</h4>
                        <div className="flex space-x-3 mb-6">
                            <Button type="success">Simpan</Button>
                            <Button type="danger">Hapus</Button>
                        </div>

                        <h4 className="font-bold text-sm text-gray-400 mb-3 uppercase">Badge Component</h4>
                        <div className="flex space-x-3 mb-6">
                            <Badge type="success">Simpan</Badge>
                            <Badge type="danger">Hapus</Badge>
                        </div>

                        <h4 className="font-bold text-sm text-gray-400 mb-3 uppercase">Avatar Component</h4>
                        <div className="flex space-x-3">
                            <Avatar name="Budi"/>
                            <Avatar name="Siti"/>
                        </div>
                    </Card>
                </div>


                {/* =========================================
                    2. FORM COMPONENTS
                ========================================= */}
                <div className="flex flex-col space-y-3">
                    <h3 className="font-bold text-gray-700 border-b pb-2">2. Form Components</h3>
                    <Card>
                        <p className="text-xs text-gray-500 mb-4">Menerima input dari pengguna.</p>
                        <div className="flex flex-col space-y-4">
                            {/* Jika komponen ini belum kamu buat logikanya, ini adalah simulasi bentuknya */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">InputField</label>
                                <input type="text" placeholder="Masukkan nama..." className="w-full border rounded-lg px-3 py-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">SelectField</label>
                                <select className="w-full border rounded-lg px-3 py-2">
                                    <option>Pilih Kategori</option>
                                    <option>Elektronik</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">TextArea</label>
                                <textarea placeholder="Tulis deskripsi..." className="w-full border rounded-lg px-3 py-2 rows-3"></textarea>
                            </div>
                        </div>
                    </Card>
                </div>


                {/* =========================================
                    3. FEEDBACK COMPONENTS
                ========================================= */}
                <div className="flex flex-col space-y-3">
                    <h3 className="font-bold text-gray-700 border-b pb-2">3. Feedback Components</h3>
                    <div className="flex flex-col space-y-3">
                        <Alert type="success">Data berhasil disimpan!</Alert>
                        <Alert type="info">Memuat data pengguna...</Alert>
                        
                        <Card>
                            <h4 className="font-bold text-sm text-gray-400 mb-3 uppercase">Modal / Loading (Simulasi)</h4>
                            <div className="flex space-x-3">
                                <Button type="primary">Trigger Modal</Button>
                                <Button type="secondary">Tampilkan Loading</Button>
                            </div>
                        </Card>
                    </div>
                </div>


                {/* =========================================
                    4. LAYOUT & CARD COMPONENTS
                ========================================= */}
                <div className="flex flex-col space-y-3">
                    <h3 className="font-bold text-gray-700 border-b pb-2">4. Layout & Card</h3>
                    
                    <Container className="bg-gray-100 p-4 rounded-xl mb-4 border border-dashed border-gray-400">
                        <h1 className="text-xl font-bold mb-2">Contoh Container</h1>
                        <p className="text-gray-600 text-sm">Ini adalah area di dalam Container Component.</p>
                    </Container>

                    <Card>
                        <h2 className="text-lg font-bold">Judul Card Standar</h2>
                        <p className="text-gray-600 text-sm">Ini adalah isi dari card standar pembungkus konten.</p>
                    </Card>
                </div>


                {/* =========================================
                    5. COMPLEX COMPONENTS (Product & Table)
                ========================================= */}
                <div className="md:col-span-2 flex flex-col space-y-3 mt-4">
                    <h3 className="font-bold text-gray-700 border-b pb-2">5. Data & Product Display</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <ProductCard
                            image="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop"
                            title="Sepatu Sport"
                            category="Fashion"
                            price="Rp 450.000"
                            description="Sepatu sport modern dengan desain nyaman dan ringan untuk aktivitas sehari-hari."
                        />

                        <ProductCard
                            image="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop"
                            title="Smartphone"
                            category="Elektronik"
                            price="Rp 4.500.000"
                            description="Smartphone dengan performa cepat, kamera jernih, dan baterai tahan lama."
                        />
                    </div>

                    <Card>
                        <h4 className="font-bold text-sm text-gray-400 mb-3 uppercase">Table Component</h4>
                        <Table headers={tableHeaders}>
                            {tableProducts.map((product, index) => (
                                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="py-3 text-gray-600">{index + 1}</td>
                                    <td className="py-3 font-semibold text-gray-800">{product.name}</td>
                                    <td className="py-3 text-gray-500">{product.category}</td>
                                    <td className="py-3 font-bold text-gray-800">{product.price}</td>
                                    <td className="py-3">
                                        <div className="flex space-x-2">
                                            <button className="p-2 bg-blue-50 text-blue-500 rounded hover:bg-blue-500 hover:text-white"><FaEdit /></button>
                                            <button className="p-2 bg-red-50 text-red-500 rounded hover:bg-red-500 hover:text-white"><FaTrash /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </Table>
                    </Card>
                </div>

                {/* =========================================
                    6. SECTION COMPONENTS (LANDING PAGE)
                ========================================= */}
                <div className="md:col-span-2 flex flex-col space-y-3 mt-4 mb-10">
                    <h3 className="font-bold text-gray-700 border-b pb-2">6. Section Components (Simulasi)</h3>
                    <p className="text-sm text-gray-500 mb-2">Komponen berukuran besar yang mewakili satu bagian halaman (Landing Page).</p>
                    
                    {/* Simulasi Hero Section */}
                    <div className="bg-gray-900 text-white p-10 rounded-2xl flex flex-col items-center justify-center text-center">
                        <Badge type="success">Hero Section Component</Badge>
                        <h1 className="text-3xl font-bold mt-4">Selamat Datang di Aplikasi Kami</h1>
                        <p className="text-gray-400 mt-2 max-w-md">Ini adalah simulasi bentuk Hero Section yang biasa dipakai di paling atas halaman depan.</p>
                    </div>

                    {/* Simulasi Feature Section */}
                    <div className="bg-blue-50 p-10 rounded-2xl flex flex-col items-center justify-center text-center mt-4 border border-blue-100">
                        <Badge type="info">Feature Section Component</Badge>
                        <h2 className="text-2xl font-bold mt-4 text-blue-900">Kenapa Memilih Kami?</h2>
                        <div className="grid grid-cols-3 gap-4 mt-6 w-full">
                            <div className="bg-white p-4 rounded-xl shadow-sm">Cepat</div>
                            <div className="bg-white p-4 rounded-xl shadow-sm">Aman</div>
                            <div className="bg-white p-4 rounded-xl shadow-sm">Terjangkau</div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}