export default function HeroSection({ title, subtitle, buttonText, onButtonClick }) {
    return (
        <section className="bg-hijau text-white py-20 px-6 rounded-2xl shadow-lg mb-10 text-center relative overflow-hidden">
            <div className="relative z-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4">{title || "Selamat Datang!"}</h1>
                <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                    {subtitle || "Kelola semua kebutuhan bisnismu dengan mudah melalui platform modern kami."}
                </p>
                {buttonText && (
                    <button 
                        onClick={onButtonClick} 
                        className="bg-white text-hijau font-bold py-3 px-8 rounded-full shadow-md hover:bg-gray-100 hover:scale-105 transition-all"
                    >
                        {buttonText}
                    </button>
                )}
            </div>
        </section>
    );
}