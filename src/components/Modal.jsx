export default function Modal({ isOpen, onClose, title, children }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 relative animate-in fade-in zoom-in duration-200">
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl leading-none transition-colors"
                >
                    &times;
                </button>
                
                {title && <h2 className="text-xl font-bold mb-4 text-gray-800">{title}</h2>}
                
                <div>{children}</div>
            </div>
        </div>
    );
}