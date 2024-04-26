import React, { useState } from "react";
import axios from "axios";
import "./financialDashboard.css"; // Ensure this points to the actual CSS file location
import { useNavigate } from "react-router-dom";
/**
 * `FinancialDashboard` is a React component for managing financial documents.
 * Users can add, upload, and remove financial document entries, which are managed as lines.
 * Each line allows users to input and submit various types of financial documents.
 * 
 * @component
 * @returns {React.Component} The FinancialDashboard component.
 */
function FinancialDashboard() {
   /**
   * Stores the current state of all document lines.
   * @type {Array<Object>}
   */
  const [documentLines, setDocumentLines] = useState([
    createNewLine("statement"),
  ]);
  /**
   * Tracks the number of successful uploads.
   * @type {number}
   */
  const [successfulUploads, setSuccessfulUploads] = useState(0);
  const navigate = useNavigate();

  /**
   * Creates a new document line with default values.
   * @param {string} documentType - The type of document for the new line (e.g., 'statement').
   * @returns {Object} The new document line object with default properties.
   */
  function createNewLine(documentType) {
    return {
      file: null,
      documentType: documentType,
      startDate: "",
      endDate: "",
      amount: "",
      date: "",
    };
  }

  const handleDocumentTypeChange = (index, documentType) => {
    const newLines = [...documentLines];
    newLines[index] = createNewLine(documentType);
    setDocumentLines(newLines);
  };

/**
   * Handles changes to fields within a document line.
   * @param {number} index - The index of the document line in the state array.
   * @param {string} field - The field within the document line to update.
   * @param {any} value - The new value to set for the specified field.
   */
  const handleFieldChange = (index, field, value) => {
    const newLines = [...documentLines];
    newLines[index][field] = value;
    setDocumentLines(newLines);
  };

  /**
   * Handles file selection changes, specifically for PDF files.
   * @param {number} index - The index of the document line where the file is being uploaded.
   * @param {File} file - The file selected by the user.
   */
  const handleFileChange = (index, file) => {
    if (file.type !== "application/pdf") {
      alert("Please select a PDF file.");
      return;
    }
    handleFieldChange(index, "file", file);
  };

    /**
   * Handles the uploading of a document file to the server.
   * @param {number} index - The index of the document line from which data is being uploaded.
   * @async
   */
  const handleFileUpload = async (index) => {
    const line = documentLines[index];
    if (line.documentType === "statement" && !line.file) {
      alert("Please select a PDF file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", line.file);
    formData.append("documentType", line.documentType);
    formData.append("startDate", line.startDate);
    formData.append("endDate", line.endDate);
    formData.append("amount", line.amount);
    formData.append("date", line.date);

    try {
      const response = await axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      alert("Data uploaded successfully");
      setSuccessfulUploads((prevCount) => prevCount + 1);
    } catch (error) {
      console.error("Error uploading data: ", error);
      alert("Error uploading data");
    }
  };

  /**
   * Removes a document line from the state based on its index.
   * @param {number} index - The index of the document line to remove.
   */
  const handleRemoveLine = (index) => {
    setDocumentLines((currentLines) =>
      currentLines.filter((_, i) => i !== index)
    );
  };

   /**
   * Handles the final submission of all documents, marking the process as complete.
   * @async
   */
  const handleFinalSubmit = async () => {
    try {
      const response = await axios.post("/final-submit", {
        message: "Upload complete",
      });
      console.log(response.data);
      alert("All documents have been successfully submitted.");
      navigate("/Current Financial Information");
    } catch (error) {
      console.error("Error on final submission: ", error);
      alert("Error on final submission");
    }
  };

  /**
   * Adds a new document line to the state array for additional document uploads.
   */
  const addUploadLine = () => {
    setDocumentLines([...documentLines, createNewLine("statement")]);
  };

  return (
    <div>
      <header>
        <h1>Upload Your Financial Document</h1>
      </header>
      <main>
        {documentLines.map((line, index) => (
          <div key={index} className="form-group">
            <select
              value={line.documentType}
              onChange={(e) => handleDocumentTypeChange(index, e.target.value)}
            >
              <option value="statement">Statement</option>
            </select>

            {line.documentType === "statement" && (
              <>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => handleFileChange(index, e.target.files[0])}
                />
                <div>
                  <input
                    type="date"
                    placeholder="Start Date"
                    value={line.startDate}
                    onChange={(e) =>
                      handleFieldChange(index, "startDate", e.target.value)
                    }
                  />
                  <input
                    type="date"
                    placeholder="End Date"
                    value={line.endDate}
                    onChange={(e) =>
                      handleFieldChange(index, "endDate", e.target.value)
                    }
                  />
                </div>
                <button
                  className="button"
                  onClick={() => handleFileUpload(index)}
                >
                  Upload Data
                </button>
              </>
            )}

            {(line.documentType === "income" ||
              line.documentType === "cashSpending") && (
              <>
                <input
                  type="number"
                  placeholder="Amount"
                  value={line.amount}
                  onChange={(e) =>
                    handleFieldChange(index, "amount", e.target.value)
                  }
                />
                <input
                  type="date"
                  placeholder="Date"
                  value={line.date}
                  onChange={(e) =>
                    handleFieldChange(index, "date", e.target.value)
                  }
                />
                <button
                  className="button2"
                  onClick={() => handleFileUpload(index)}
                >
                  Upload Data
                </button>
              </>
            )}

            {/* Button to remove the current document line */}
            <button
              className="button-remove"
              onClick={() => handleRemoveLine(index)}
            >
              Remove
            </button>
          </div>
        ))}
        <button className="button" onClick={addUploadLine}>
          Add Another Document
        </button>
        {successfulUploads >= 5 && (
          <button onClick={handleFinalSubmit}>Submit All Documents</button>
        )}
      </main>
      <footer>{/* <p>&copy; 2024 Money Tree</p> */}</footer>
    </div>
  );
}

export default FinancialDashboard;
