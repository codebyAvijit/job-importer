import axios from "axios";

function ImportButton({ onImport }) {
  const handleClick = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/import");
      alert(`Queued ${res.data.count} jobs for import!`);
      onImport(); // Refresh logs
    } catch (err) {
      console.error(err);
      alert("Failed to queue import!");
    }
  };

  return (
    <button
      onClick={handleClick}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      Trigger Import
    </button>
  );
}

export default ImportButton;
