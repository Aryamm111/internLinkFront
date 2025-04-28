import React, { useState, useEffect } from "react";
import Table from "../components/Table";
import { useStudents } from "../context/StudentContext";
import { useApplication } from "../context/ApplicationContext";
import { useCompanySupervisors } from "../context/CompanySupervisorContext";
import { UilCheckCircle, UilTimesCircle } from "@iconscout/react-unicons";

const AssignSupervisor = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudentIds, setSelectedStudentIds] = useState([]);
  const [selectedSupervisorId, setSelectedSupervisorId] = useState("");

  const { assignCompanySupervisor } = useStudents();
  const { fetchAcceptedStudents } = useApplication();
  const { supervisors, fetchSupervisors } = useCompanySupervisors();

  useEffect(() => {
    const fetchData = async () => {
      const studentsData = await fetchAcceptedStudents();
      setStudents(studentsData);
      await fetchSupervisors();
    };

    fetchData();
  }, [fetchAcceptedStudents, fetchSupervisors]);

  const toggleStudentSelection = (id) => {
    setSelectedStudentIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const handleAssign = async () => {
    if (!selectedSupervisorId || selectedStudentIds.length === 0) return;

    try {
      await assignCompanySupervisor(selectedSupervisorId, selectedStudentIds);
      alert("Supervisor assigned successfully!");
      setSelectedStudentIds([]);
      setSelectedSupervisorId("");
    } catch {
      alert("Failed to assign supervisor.");
    }
  };

  const columns = [
    {
      key: "select",
      header: "",
      render: (_, row) => (
        <input
          type="checkbox"
          checked={selectedStudentIds.includes(row.id)}
          onChange={() => toggleStudentSelection(row.id)}
          className="cursor-pointer"
        />
      ),
    },
    { key: "name", header: "Name" },
    { key: "email", header: "Email" },
    { key: "major", header: "Major" },
    { key: "gpa", header: "GPA" },
    {
      key: "assigned",
      header: "Assigned?",
      render: (_, row) =>
        row.companySupervisorId ? (
          <UilCheckCircle className="text-green-600 w-6 h-6" />
        ) : (
          <UilTimesCircle className="text-gray-500 w-6 h-6" />
        ),
    },
  ];

  return (
    <div className="p-6">
      <h1 className="mb-10">Assign Supervisor</h1>

      <div className="relative mb-20 p-4 w-full bg-[#F5F5F5] rounded-lg">
        {selectedStudentIds.length > 0 && (
          <div className="absolute right-4 top-[40px] z-10 flex items-center gap-3">
            <select
              className="border bg-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedSupervisorId}
              onChange={(e) => setSelectedSupervisorId(e.target.value)}
            >
              <option value="">Select Supervisor</option>
              {supervisors.map((sup) => (
                <option key={sup.id} value={sup.id}>
                  {sup.name}
                </option>
              ))}
            </select>

            <button
              onClick={handleAssign}
              className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
            >
              <span>Assign</span>
            </button>
          </div>
        )}

        <Table columns={columns} data={students} />
      </div>
    </div>
  );
};

export default AssignSupervisor;
