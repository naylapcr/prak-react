export default function SelectField({ label, options, value, onChange }) {
    return (
        <div className="mb-4 w-full">
            {label && (
                <label className="block text-gray-700 font-semibold mb-2">
                    {label}
                </label>
            )}
            <select
                value={value}
                onChange={onChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-hijau focus:ring-1 focus:ring-hijau bg-white transition-all cursor-pointer"
            >
                <option value="" disabled>Pilih salah satu...</option>
                {options.map((opt, index) => (
                    <option key={index} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
}