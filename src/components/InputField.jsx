export default function InputField({ label, type = "text", placeholder, value, onChange }) {
    return (
        <div className="mb-4 w-full">
            {label && (
                <label className="block text-gray-700 font-semibold mb-2">
                    {label}
                </label>
            )}
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-hijau focus:ring-1 focus:ring-hijau transition-all"
            />
        </div>
    );
}