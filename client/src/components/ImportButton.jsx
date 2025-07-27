import axios from "axios";
import { FiDownload } from "react-icons/fi"; // Install react-icons if not already: npm i react-icons

function ImportButton({ onImport }) {
  const handleClick = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/import");
      alert(`✅ Queued ${res.data.count} jobs for import!`);
      onImport(); // Refresh logs
    } catch (err) {
      console.error(err);
      alert("❌ Failed to queue import!");
    }
  };

  return (
    <button
      onClick={handleClick}
      className="bg-indigo-600 text-white px-5 py-2 rounded-xl flex items-center gap-2 shadow-md hover:bg-indigo-700 active:scale-95 transition"
    >
      <FiDownload className="text-lg" />
      Trigger Import
    </button>
  );
}

export default ImportButton;
