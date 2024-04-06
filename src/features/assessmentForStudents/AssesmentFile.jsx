import { useState } from "react";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import { useUploadAssesment } from "./useAssessment";
import Spinner from "../../ui/Spinner";
import { useSelector } from "react-redux";
import { useMoveBack } from "../../hooks/useMoveBack";

function AssesmentFile({ allIds }) {
  const [fileUploaded, setFileUploaded] = useState(false);
  const [file, setFile] = useState(null);
  const { isUploading, uploadFile } = useUploadAssesment(allIds);

  // Function to handle file change
  const handleFileChange = (event) => {
    // Check if files are uploaded
    if (event.target.files.length > 0) {
      setFile(event.target.files[0]);
      setFileUploaded(true);
    } else {
      setFile(null);
      setFileUploaded(false);
    }
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    if (fileUploaded && file) {
      console.log("File uploaded:", file);
      // console.log("THIS IS SUBJ ID IN ASS FILE", subjectId);
      let insertData = { file, ...allIds };
      uploadFile(insertData);
      // Perform form submission logic
      console.log("Form submitted successfully");
    } else {
      alert("Please upload a PDF file before submitting");
    }
  };
  if (isUploading) return <Spinner />;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <FileInput
          id="pdfFile" // Give it a descriptive ID
          accept=".pdf" // Specify that only PDF files are allowed
          type="file"
          onChange={handleFileChange} // Handle file change
        />
        <Button size="small" type="submit">
          Submit
        </Button>{" "}
      </div>
    </form>
  );
}

export default AssesmentFile;
