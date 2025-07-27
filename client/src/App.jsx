import ImportButton from "./components/ImportButton";
import LogsTable from "./components/LogsTable";
import { useState } from "react";

function App() {
  const [refresh, setRefresh] = useState(false);
  const triggerRefresh = () => setRefresh(!refresh);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Job Importer Admin
      </h1>
      <ImportButton onImport={triggerRefresh} />
      <LogsTable key={refresh} />
    </div>
  );
}

export default App;
