import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useInternships } from "../context/InternshipContext.jsx";

// Icons (assume these are imported correctly)
import {
  UilLabelAlt,
  UilBuilding,
  UilLocationPoint,
  UilCalendarAlt,
  UilFileAlt,
  UilSchedule,
  UilUser,
  UilClipboardAlt,
} from "@iconscout/react-unicons";

const AddNewAnnouncement = () => {
  const { createInternship, updateInternship } = useInternships();
  const location = useLocation();
  const internshipData = location.state?.internship;

  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
    startDate: "",
    duration: "",
    majors: [],
    requiredSkills: [],
    maxStudents: "",
    internshipPlanFile: null,
    internshipImage: null,
  });

  useEffect(() => {
    if (internshipData) {
      setForm((prev) => ({
        ...prev,
        title: internshipData.title || "",
        company: internshipData.company || "",
        location: internshipData.location || "",
        description: internshipData.description || "",
        startDate: internshipData.startDate
          ? internshipData.startDate.split("T")[0]
          : "",
        duration: internshipData.duration || "",
        majors: internshipData.majors || [],
        requiredSkills: internshipData.requiredSkills || [],
        maxStudents: internshipData.maxStudents || "",
        // files will be null; no need to fill
      }));
    }
  }, [internshipData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setForm((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleArrayChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value.split(",").map((item) => item.trim()),
    }));
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toISOString().split("T")[0];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("company", form.company);
    formData.append("location", form.location);
    formData.append("description", form.description);
    formData.append("startDate", formatDate(form.startDate));
    formData.append("duration", form.duration);
    formData.append(
      "majors",
      new Blob([JSON.stringify(form.majors)], { type: "application/json" })
    );
    formData.append(
      "requiredSkills",
      new Blob([JSON.stringify(form.requiredSkills)], {
        type: "application/json",
      })
    );
    formData.append("maxStudents", form.maxStudents);

    if (form.internshipPlanFile)
      formData.append("internshipPlanFile", form.internshipPlanFile);
    if (form.internshipImage)
      formData.append("internshipImage", form.internshipImage);

    try {
      if (internshipData && internshipData.id) {
        await updateInternship(internshipData.id, formData);
        alert("Internship updated successfully!");
      } else {
        await createInternship(formData);
        alert("Internship created successfully!");
      }

      setForm({
        title: "",
        company: "",
        location: "",
        description: "",
        startDate: "",
        duration: "",
        majors: [],
        requiredSkills: [],
        maxStudents: "",
        internshipPlanFile: null,
        internshipImage: null,
      });
    } catch (error) {
      console.error("Error submitting internship", error);
      alert("Failed to submit internship.");
    }
  };

  return (
    <div className="p-10 w-full max-w-6xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        {internshipData ? "Edit Internship" : "Add New Announcement"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow space-y-6"
      >
        <div className="grid grid-cols-2 gap-4">
          <InputField
            icon={<UilLabelAlt />}
            label="Title"
            name="title"
            value={form.title}
            onChange={handleChange}
          />
          <InputField
            icon={<UilBuilding />}
            label="Company"
            name="company"
            value={form.company}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <InputField
            icon={<UilLocationPoint />}
            label="Location"
            name="location"
            value={form.location}
            onChange={handleChange}
          />
          <InputField
            icon={<UilCalendarAlt />}
            label="Start Date"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
            type="date"
          />
        </div>

        <TextArea
          icon={<UilFileAlt />}
          label="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
        />

        <div className="grid grid-cols-2 gap-4">
          <InputField
            icon={<UilSchedule />}
            label="Duration (weeks)"
            name="duration"
            value={form.duration}
            onChange={handleChange}
            type="number"
            min="1" // Ensures positive numbers only
          />

          <InputField
            icon={<UilUser />}
            label="Majors (comma separated)"
            name="majors"
            value={form.majors.join(", ")}
            onChange={handleArrayChange}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <InputField
            icon={<UilClipboardAlt />}
            label="Skills (comma separated)"
            name="requiredSkills"
            value={form.requiredSkills.join(", ")}
            onChange={handleArrayChange}
          />
          <InputField
            icon={<UilUser />}
            label="Max Students"
            name="maxStudents"
            value={form.maxStudents}
            onChange={handleChange}
            type="number"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FileInput
            label="Internship Plan (PDF)"
            name="internshipPlanFile"
            onChange={handleChange}
          />
          <FileInput
            label="Internship Image"
            name="internshipImage"
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-end mt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {internshipData ? "Update" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

// Reusable Input components
const InputField = ({
  icon,
  label,
  name,
  value,
  onChange,
  type = "text",
  min,
}) => (
  <div className="flex items-center gap-2">
    {icon}
    <div className="w-full">
      <label className="font-semibold text-gray-700">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        min={min} // Pass min prop for number inputs
        className="w-full border bg-white focus:outline-none focus:ring-2 focus:ring-pink-100 border-gray-300 rounded-md p-2"
        required
      />
    </div>
  </div>
);

const TextArea = ({ icon, label, name, value, onChange }) => (
  <div className="flex items-start gap-2">
    {icon}
    <div className="w-full">
      <label className="font-semibold text-gray-700">{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows="4"
        className="w-full border bg-white focus:outline-none focus:ring-2 focus:ring-pink-100 border-gray-300 rounded-md p-2"
        required
      />
    </div>
  </div>
);

const FileInput = ({ label, name, onChange }) => (
  <div>
    <label className="font-semibold text-gray-700">{label}</label>
    <input type="file" name={name} onChange={onChange} className="block mt-1" />
  </div>
);

export default AddNewAnnouncement;
