import "./reports.css";
import React, { useEffect, useState } from "react";

function isArchived(uploadedAt) {
  var oneWeek = 7 * 24 * 60 * 60 * 1000;
  return new Date() - new Date(uploadedAt) > oneWeek;
}

function getStatusColor(status) {
  switch (status) {
    case "local":
      return "text-red-600";
    case "uploaded":
      return "text-blue-600";
    case "archived":
      return "text-green-600";
    default:
      return "";
  }
}

function ReportTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(function () {
    fetchData();
  }, []);

  function fetchData() {
    fetch("/api/captured-data")
      .then(function (response) {
        return response.json();
      })
      .then(function (fetchedData) {
        // Auto-archive entries older than 7 days (if uploaded)
        var updated = fetchedData.map(function (item) {
          if (item.syncStatus === "uploaded" && isArchived(item.uploadedAt)) {
            return Object.assign({}, item, { syncStatus: "archived" });
          }
          return item;
        });

        setData(updated);
        setLoading(false);
      })
      .catch(function (error) {
        console.error("Failed to fetch data:", error);
        setLoading(false);
      });
  }

  if (loading) {
    return <div className="p-4">Loading report...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Data Sync Report</h2>
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Captured At</th>
            <th className="border px-4 py-2">Sync Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map(function (entry) {
            return (
              <tr key={entry.id}>
                <td className="border px-4 py-2">{entry.id}</td>
                <td className="border px-4 py-2">{entry.name}</td>
                <td className="border px-4 py-2">
                  {new Date(entry.capturedAt).toLocaleString()}
                </td>
                <td className={"border px-4 py-2 " + getStatusColor(entry.syncStatus)}>
                  {entry.syncStatus}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ReportTable;
