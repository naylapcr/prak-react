import { useState } from "react";
import frameworkData from "./framework.json";

export default function FrameworkListSearchFilter() {
  // /** Deklrasai state **/
  // const [searchTerm, setSearchTerm] = useState("");
  // const [selectedTag, setSelectedTag] = useState("");

  	/*Inisialisasi DataForm*/
		const [dataForm, setDataForm] = useState({
			searchTerm: "",
			selectedTag: "",
      searchDev: "",
			/*Tambah state lain beserta default value*/
			});
		
		/*Inisialisasi Handle perubahan nilai input form*/
		const handleChange = (evt) => {
			const { name, value } = evt.target;
			setDataForm({
				...dataForm,
				[name]: value,
			});
		};

  /** Deklrasai Logic Search & Filter **/
  const _searchTerm = dataForm.searchTerm.toLowerCase();
  const filteredFrameworks = frameworkData.filter((framework) => {
    const matchesSearch =
      framework.name.toLowerCase().includes(_searchTerm) ||
      framework.description.toLowerCase().includes(_searchTerm) ||
      framework.details.developer.toLowerCase().includes(_searchTerm) ||
      framework.details.releaseYear.toString().includes(_searchTerm);

    const matchesTag = dataForm.selectedTag
      ? framework.tags.includes(selectedTag)
      : true;

    return matchesSearch && matchesTag;
  });

  /** Deklarasi pengambilan unique tags di frameworkData **/
  const allTags = [
    ...new Set(frameworkData.flatMap((framework) => framework.tags)),
  ];

  return (
    <div className="p-8 bg-amber-50 min-h-screen">
      {/* Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <input
          type="text"
          name="searchTerm"
          placeholder="Search framework..."
          className="w-full p-2 border border-gray-300 rounded mb-4"
          onChange={handleChange}
        />

        <select
          name="selectedTag"
          className="w-full p-2 border border-gray-300 rounded mb-4"
        onChange={handleChange}
        >
          <option value="">All Tags</option>
          {allTags.map((tag, index) => (
            <option key={index} value={tag}>
              {tag}
            </option>
          ))}
        </select>

        {filteredFrameworks.map((item) => (
          <div
            key={item.id}
            // Desain Neo-brutalism: Border hitam tebal, Shadow kaku hitam, Warna Pop
            className="border-4 border-black p-6 rounded-xl bg-white shadow-[8px_8px_0px_rgba(0,0,0,1)] 
                   hover:shadow-[12px_12px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 
                   transition-all duration-200"
          >
            {/* Header Section dengan Warna Latar Judul */}
            <div className="inline-block border-2 border-black bg-lime-300 px-4 py-1 rounded-full mb-4 transform -rotate-2">
              <h2 className="text-xl font-bold text-black tracking-tight">
                {item.name}
              </h2>
            </div>

            {/* Info Rilis - Lebih Simpel */}
            <p className="text-xs font-mono text-gray-700 mb-4 bg-gray-100 inline-block p-1 border border-black/10">
          // Released: <span className="font-bold text-black">{item.details.releaseYear}</span> by {item.details.developer}
            </p>

            {/* Deskripsi */}
            <p className="text-gray-800 text-sm leading-relaxed mb-6 font-medium line-clamp-3">
              {item.description}
            </p>

            {/* Tags Section - Sangat Colorful */}
            <div className="flex flex-wrap gap-2 mb-8">
              {item.tags.map((tag, index) => {
                // Logika acak warna tag (bisa disesuaikan)
                const colors = [
                  'bg-sky-200 text-sky-900',
                  'bg-pink-200 text-pink-900',
                  'bg-yellow-200 text-yellow-900',
                  'bg-violet-200 text-violet-900'
                ];
                const colorClass = colors[index % colors.length]; // Mengulang warna jika tag banyak

                return (
                  <span
                    key={index}
                    className={`border border-black px-3 py-1 text-xs font-bold rounded ${colorClass}`}
                  >
                    {tag}
                  </span>
                );
              })}
            </div>

            {/* Action Button - Colorful & Interaktif */}
            <a
              href={item.details.officialWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center py-3 rounded-lg border-2 border-black bg-rose-400 text-black 
                     text-sm font-black uppercase tracking-wider
                     hover:bg-rose-500 hover:scale-[1.02] transition-all"
            >
              Explore Docs
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}