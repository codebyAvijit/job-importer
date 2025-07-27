import ImportButton from "./components/ImportButton";
import LogsTable from "./components/LogsTable";
import { useState } from "react";

function App() {
  const [refresh, setRefresh] = useState(false);
  const triggerRefresh = () => setRefresh(!refresh);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl p-6">
        <h1 className="text-4xl font-bold text-center text-indigo-700 mb-6">
          🚀 Job Importer Dashboard
        </h1>
        <div className="flex justify-center mb-6">
          <ImportButton onImport={triggerRefresh} />
        </div>
        <LogsTable key={refresh} />
      </div>
    </div>
  );
}

export default App;
