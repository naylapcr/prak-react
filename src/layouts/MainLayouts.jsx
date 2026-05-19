import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Container from "../components/Container";
import Footer from "../components/Footer";

export default function MainLayout() {
  return (
    <div id="app-container" className="bg-gray-100 h-screen flex w-full overflow-hidden">
      
      {/* Bagian Kiri: Sidebar statis */}
      <Sidebar />
      
      {/* Bagian Kanan: Area Utama yang bisa di-scroll */}
      <div id="main-content" className="flex-1 flex flex-col overflow-y-auto">
        
        {/* Header di bagian atas */}
        <Header />
        
        {/* Pembungkus Konten: flex-1 akan mendorong Footer ke bawah jika konten kosong/sedikit */}
        <div id="page-content" className="flex-1">
          <Container>
            {/* Outlet akan merender komponen halaman sesuai route */}
            <Outlet />
          </Container>
        </div>
        
        {/* Footer di bagian paling bawah area konten */}
        <Footer />
        
      </div>
    </div>
  );
}