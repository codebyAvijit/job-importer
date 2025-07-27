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
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-indigo-700 mb-4">
        📋 Import Logs
      </h2>
      <div className="overflow-x-auto rounded-xl shadow-lg border border-indigo-100 bg-white">
        <table className="min-w-full text-sm text-center table-auto">
          <thead className="bg-indigo-100 text-indigo-900">
            <tr>
              <th className="px-4 py-2">🕒 Timestamp</th>
              <th className="px-4 py-2">📦 Total</th>
              <th className="px-4 py-2 text-green-600">✅ New</th>
              <th className="px-4 py-2 text-blue-600">🔁 Updated</th>
              <th className="px-4 py-2 text-red-600">❌ Failed</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="px-4 py-2">
                  {new Date(log.timestamp).toLocaleString()}
                </td>
                <td className="px-4 py-2">{log.totalFetched}</td>
                <td className="px-4 py-2 text-green-600 font-medium">
                  {log.newJobs}
                </td>
                <td className="px-4 py-2 text-blue-600 font-medium">
                  {log.updatedJobs}
                </td>
                <td className="px-4 py-2 text-red-600 font-medium">
                  {log.failedJobs}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LogsTable;
