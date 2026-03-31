export default function TailwindCSS () {
    return (
        <div>
            <FlexboxGrid/>
            <h1 class="border m-4">Belajar Tailwind CSS 4</h1>
            <button className="bg-teal-500 text-white 
                               px-4 py-2 mx-4 rounded 
                               shadow-lg">Click Me</button>
                               <Spacing title="Judul Card" content="ini merupakan isi dari card Spacing"/>
                               <Typography/>
                               <BorderRadius/>
                               <BackgroundColors/>
                               <ShadowEffects/>
                               <TailwindExplorer/>
        </div>
    )
}

function Spacing(props){
    return (
        <div className="bg-teal-200 shadow-lg p-6 m-4 rounded-lg">
            <h2 className="text-lg font-extrabold">{props.title}</h2>
            <p className="mt-2 text-black">{props.content}</p>
        </div>
    )
}

function Typography(){
    return (
        <div className="ml-4 underline">
            <h1 className="text-4xl font-bold text-cyan-800">Tailwind Typography</h1>
            <p className="text-gray-600 text-md mt-2">Belajar Tailwind sangat menyenangkan dan cepat!</p>
        </div>
    )
}

function BorderRadius(){
    return (
        <div className="m4"> 
        <button className="m-4 border-3 border-cyan-500 text-cyan-500 px-4 py-2 rounded-l-full"> Klik Saya </button>
        <button className="m-4 border-3 border-cyan-500 text-cyan-500 px-4 py-2 rounded-r-full"> Klik Saya </button>
    </div>    
    )
}

function BackgroundColors(){
    return(
        <div className="m-4 bg-teal-600 text-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold">Tailwind Colors</h3>
            <p className="mt-2">Belajar Tailwind itu seru dan fleksibel!</p>
        </div>
    )
}

function FlexboxGrid(){
    return (
        <nav className="flex justify-between bg-teal-600 p-4 text-white">
            <h1 className="text-lg font-bold">MyWebsite</h1>
            <ul className="flex space-x-4">
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
            <h1 className="text-lg font-bold">Login</h1>
        </nav>
    )
}

function ShadowEffects(){
    return (
        <div className="m-4 bg-white shadow-lg p-6 rounded-lg hover:shadow-md transition">
            <h3 className="text-xl font-semibold">Hover me!</h3>
            <p className="text-gray-600 mt-2">Lihat efek bayangan saat hover.</p>
        </div>
    )
}

function TailwindExplorer() {
  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* 1. Gabungan FlexboxGrid: Navbar Sederhana */}
      <nav className="flex justify-between items-center bg-teal-600 p-4 text-white rounded-t-xl shadow-lg">
        <h1 className="text-xl font-bold">Tailwind Learner</h1>
        <ul className="flex space-x-6 text-sm font-medium">
          <li><a href="#" className="hover:underline">Home</a></li>
          <li><a href="#" className="hover:underline">Explore</a></li>
        </ul>
        <button className="bg-white text-teal-600 px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-teal-50 transition">
          Login
        </button>
      </nav>

      {/* Konten Utama */}
      <div className="bg-white border-x border-b border-gray-200 p-6 rounded-b-xl shadow-sm">
        
        {/* 2. Gabungan Typography & Spacing */}
        <div className="mb-6">
          <h1 className="text-3xl font-extrabold text-cyan-800 underline decoration-cyan-500/30">
            Belajar Tailwind CSS 4
          </h1>
          <p className="text-gray-600 text-md mt-2">
            Menggabungkan semua elemen dasar untuk membuat komponen yang cantik dan responsif.
          </p>
        </div>

        {/* 3. Gabungan BackgroundColors & ShadowEffects */}
        <div className="bg-teal-100 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border border-teal-200">
          <h3 className="text-xl font-bold text-teal-800">Spesial Promo Belajar</h3>
          <p className="mt-2 text-teal-700">
            Ini adalah isi konten yang menggunakan warna background cerah dan efek bayangan yang dinamis saat disentuh kursor.
          </p>
          
          {/* 4. Gabungan Click Me Button & BorderRadius */}
          <div className="mt-6 flex flex-wrap gap-4">
            {/* Tombol dengan rounded kiri */}
            <button className="bg-teal-600 text-white px-6 py-2 rounded-l-full font-semibold hover:bg-teal-700 shadow-md transition-colors">
              Mulai Belajar
            </button>
            
            {/* Tombol dengan rounded kanan */}
            <button className="border-2 border-teal-600 text-teal-600 px-6 py-2 rounded-r-full font-semibold hover:bg-teal-50 transition-colors">
              Lihat Silabus
            </button>
          </div>
        </div>

        {/* Footer Kecil (Tambahan eksplorasi) */}
        <p className="text-center text-xs text-gray-400 mt-6">
          Dibuat dengan ❤️ menggunakan komponen dasar Tailwind.
        </p>
      </div>
    </div>
  )
}

