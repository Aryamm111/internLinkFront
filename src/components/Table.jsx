import React, { useState, useMemo } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useUser } from "../UserContext"; // ✅ Import useUser

const Table = ({ columns, data, showAddButton, onAddClick }) => {
  const { userRole } = useUser(); // ✅ Get userRole from context
  const [page, setPage] = useState(0);
  const rowsPerPage = 7;
  const [filter, setFilter] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = useMemo(() => {
    if (sortConfig.key) {
      return [...data].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return data;
  }, [data, sortConfig]);

  const filteredData = useMemo(() => {
    return sortedData.filter((row) =>
      columns.some((col) =>
        row[col.key]?.toString().toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [sortedData, filter, columns]);

  const paginatedData = useMemo(() => {
    const startIndex = page * rowsPerPage;
    return filteredData.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredData, page, rowsPerPage]);

  return (
    <div className="overflow-x-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-3 py-2 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200 ease-in-out"
        />
        {showAddButton && userRole === "FACULTY_SUPERVISOR" && ( 
          <button
            onClick={onAddClick}
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-pink-600 transition-colors duration-300 ml-4"
          >
            <AiOutlinePlus size={16} />
          </button>
          
        )}
      </div>
      <table className="min-w-full bg-white border">
        <thead className="bg-pink-100">
          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                className="py-3 px-4 border-b font-medium text-gray-700 cursor-pointer"
                onClick={() => handleSort(col.key)}
              >
                {col.header}
                {sortConfig.key === col.key && (
                  <span>{sortConfig.direction === "ascending" ? " ↑" : " ↓"}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, rowIndex) => (
            <tr
              key={row.id}
              className={`${
                rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"
              } hover:bg-gray-100 transition duration-150 ease-in-out`}
            >
              {columns.map((col, colIndex) => (
                <td
                  key={colIndex}
                  className={`py-3 px-4 border-b text-gray-700 ${
                    col.className ? col.className(row[col.key]) : ""
                  }`}
                >
                  {col.key === "index"
                    ? rowIndex + 1
                    : col.render
                    ? col.render(row[col.key], row)
                    : row[col.key] || "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          disabled={page === 0}
          className="px-4 py-2 bg-pink-500 text-white rounded-full shadow-lg hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200 ease-in-out disabled:opacity-50"
        >
          ← Previous
        </button>
        <span className="text-gray-700">
          Page {page + 1} of {Math.ceil(filteredData.length / rowsPerPage)}
        </span>
        <button
          onClick={() =>
            setPage((prev) =>
              Math.min(prev + 1, Math.ceil(filteredData.length / rowsPerPage) - 1)
            )
          }
          disabled={page === Math.ceil(filteredData.length / rowsPerPage) - 1}
          className="px-4 py-2 bg-pink-500 text-white rounded-full shadow-lg hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200 ease-in-out disabled:opacity-50"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default Table;
