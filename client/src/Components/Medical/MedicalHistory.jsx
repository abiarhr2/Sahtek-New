import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";  // <-- Add this line
import './MedicalHistory.css';

const MedicalHistory = () => {
  const userId = "605c72ef1532072b88d3f53a";
  const [record, setRecord] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/records/${userId}`)
      .then((res) => {
        console.log("Fetched record:", res.data);
        setRecord(res.data);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load medical history.");
      });
  }, []);

  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Medical Record", 20, 20);

    doc.setFontSize(12);
    doc.text(`Date: ${record.date ? new Date(record.date).toLocaleDateString() : "N/A"}`, 20, 40);
    doc.text(`Type: ${record.type || "N/A"}`, 20, 50);
    doc.text(`Description: ${record.description || "N/A"}`, 20, 60);
    doc.text(`Doctor: ${record.doctor || "N/A"}`, 20, 70);

    doc.save("medical_record.pdf");
  };

  if (error) return <p>{error}</p>;
  if (!record) return <p>Loading...</p>;

  return (
    <div className="medical-history-container">
      <h2 className="title">Medical Record</h2>
      <div className="record-card">
        <p><strong>Date:</strong> {record.date ? new Date(record.date).toLocaleDateString() : "N/A"}</p>
        <p><strong>Type:</strong> {record.type || "N/A"}</p>
        <p><strong>Description:</strong> {record.description || "N/A"}</p>
        <p><strong>Doctor:</strong> {record.doctor || "N/A"}</p>
      </div>
      <button onClick={downloadPDF} className="download-btn">Download PDF</button>
    </div>
  );
};

export default MedicalHistory;
