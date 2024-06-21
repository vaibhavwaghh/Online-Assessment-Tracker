import React from "react";
import { convertToCSV } from "../utils/CSVUtils";

function ExportButton({ studentData }) {
  const buttonStyle = {
    backgroundColor: "#4CAF50",
    border: "none",
    color: "white",
    padding: "10px 20px",
    textAlign: "center",
    textDecoration: "none",
    display: "inline-block",
    fontSize: "16px",
    margin: "4px 2px",
    cursor: "pointer",
    borderRadius: "5px",
    width: "100%",
  };

  const handleExport = () => {
    const csvContent = convertToCSV(studentData);
    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "student_data.csv";
    link.click();
  };

  return (
    <button style={buttonStyle} onClick={handleExport}>
      Export to CSV
    </button>
  );
}

export default ExportButton;
