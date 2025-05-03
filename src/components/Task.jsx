import React from "react";

export const Task = ({ task, toggleTask, isOverdue }) => {
  const isCompleted = task.completed;
  const isDisabled = isOverdue && !isCompleted;

  // English-formatted date function
  const formatDueDate = (dateString) => {
    if (!dateString) return "No due date";

    const dueDate = new Date(dateString);
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Force English formatting
    const englishOptions = {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: "UTC",
    };

    // Format time (e.g., "2:30 PM")
    const timeString = dueDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    // Check if due date is today
    if (dueDate.toDateString() === now.toDateString()) {
      return `Today at ${timeString}`;
    }

    // Check if due date is tomorrow
    if (dueDate.toDateString() === tomorrow.toDateString()) {
      return `Tomorrow at ${timeString}`;
    }

    // Format date (e.g., "Mar 15 at 2:30 PM")
    return dueDate
      .toLocaleDateString("en-US", englishOptions)
      .replace(",", " at");
  };

  return (
    <div
      className={`relative flex justify-between items-center p-6 rounded-xl mb-4 w-full transition-all duration-300 overflow-hidden group ${
        isCompleted
          ? "bg-gradient-to-r from-gray-50 to-gray-100 border-l-4 border-gray-300"
          : isDisabled
          ? "bg-gradient-to-r from-red-50/80 to-red-100/80 border-l-4 border-red-400"
          : "bg-white hover:shadow-lg hover:-translate-y-0.5 border-l-4 border-transparent hover:border-pink-300"
      }`}
    >
      {/* Background gradient - different color for overdue tasks */}
      {!isCompleted && !isDisabled && (
        <div className="absolute inset-0 bg-gradient-to-r from-pink-50/30 to-purple-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0" />
      )}
      {isDisabled && (
        <div className="absolute inset-0 bg-gradient-to-r from-red-50/20 to-red-100/20 opacity-100 transition-opacity duration-300 -z-0" />
      )}

      <div className="flex items-center w-full z-10">
        <input
          type="checkbox"
          className={`mr-6 h-6 w-6 ${
            isDisabled ? "cursor-not-allowed" : "cursor-pointer"
          } appearance-none rounded-full border-2 ${
            isCompleted
              ? "border-green-400 bg-green-400 bg-checkmark"
              : isDisabled
              ? "border-red-300"
              : "border-pink-300 hover:border-pink-400"
          } transition-all duration-200 relative`}
          checked={isCompleted}
          onChange={() => !isDisabled && toggleTask(task.id)}
          disabled={isDisabled}
        />

        <div className="flex-1 min-w-[500px] max-w-[600px]">
          <h2
            className={`text-lg font-semibold ${
              isCompleted
                ? "line-through text-gray-500"
                : isDisabled
                ? "text-red-800"
                : "text-gray-800 group-hover:text-gray-900"
            } transition-colors duration-200`}
          >
            {task.title}
            {isDisabled && (
              <span className="ml-2 text-xs text-red-600 bg-red-100 px-2 py-0.5 rounded-full">
                OVERDUE
              </span>
            )}
          </h2>
          <p
            className={`${
              isCompleted
                ? "text-gray-400"
                : isDisabled
                ? "text-red-600/90"
                : "text-gray-600 group-hover:text-gray-700"
            } transition-colors duration-200`}
          >
            {task.description}
          </p>
        </div>
      </div>

      <span
        className={`text-sm px-3 py-1 w-40 rounded-full ${
          isCompleted
            ? "text-gray-500 bg-gray-100"
            : isDisabled
            ? "text-red-700 bg-red-100"
            : "text-pink-600 bg-pink-50 group-hover:bg-pink-100"
        } transition-colors duration-200 z-10 text-center`}
      >
        {formatDueDate(task.dueDate)}
      </span>
    </div>
  );
};
