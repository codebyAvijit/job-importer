import { useEffect, useState } from "react";
import axios from "axios";

function LogsTable() {
  const [logs, setLogs] = useState([]);

  const fetchLogs = async () => {
    const res = await axios.get("http://localhost:5000/api/logs");
    setLogs(res.data.reverse()); // show latest first
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-2">Import Logs</h2>
      <table className="w-full border-collapse border border-gray-400 text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2 py-1">Timestamp</th>
            <th className="border px-2 py-1">Total</th>
            <th className="border px-2 py-1">New</th>
            <th className="border px-2 py-1">Updated</th>
            <th className="border px-2 py-1">Failed</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, i) => (
            <tr key={i} className="text-center">
              <td className="border px-2 py-1">
                {new Date(log.timestamp).toLocaleString()}
              </td>
              <td className="border px-2 py-1">{log.totalFetched}</td>
              <td className="border px-2 py-1">{log.newJobs}</td>
              <td className="border px-2 py-1">{log.updatedJobs}</td>
              <td className="border px-2 py-1">{log.failedJobs}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LogsTable;
