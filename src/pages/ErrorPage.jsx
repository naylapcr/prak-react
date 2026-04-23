import React from "react";

const ErrorPage = ({ errorCode, errorDescription, errorImage }) => {
  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-xl shadow-gray-200/50 text-center border border-gray-100 transition-all duration-300 hover:shadow-2xl">
        
        {/* Lingkaran Dekoratif di Belakang Gambar */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-blue-50 rounded-full scale-110 blur-xl opacity-50 mx-auto w-40 h-40"></div>
          <img 
            src={errorImage} 
            alt={`Error ${errorCode}`} 
            className="relative w-48 h-48 mx-auto object-contain animate-bounce-slow" 
          />
        </div>

        {/* Teks Error */}
        <h1 className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-indigo-500 mb-2">
          {errorCode}
        </h1>
        
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Oops! Terjadi Kesalahan
        </h2>
        
        <p className="text-gray-500 leading-relaxed mb-8 px-4">
          {errorDescription}
        </p>

        {/* Tombol Interaktif */}
        <div className="flex flex-col space-y-3">
          <button 
            onClick={() => window.history.back()}
            className="w-full py-3 bg-green-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition-all active:scale-95"
          >
            Kembali Sekarang
          </button>
          
          <button 
            onClick={() => window.location.href = '/'}
            className="w-full py-3 bg-gray-50 text-gray-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors text-sm"
          >
            Ke Dashboard Utama
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;