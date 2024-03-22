import { useState } from "react";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Table from "../../ui/Table";
import { formatDate } from "../../utils/helpers";
import { useUploadAssesment } from "./useAssessment";
import Spinner from "../../ui/Spinner";
function AssesmentRow({ assesment, teacher }) {
  const { assignmentName, deadline, assignmentInformation, id } = assesment;
  console.log(id);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [file, setFile] = useState(null);
  const { isUploading, uploadFile } = useUploadAssesment();
  // Function to handle the download of the PDF file
  const handleDownload = () => {
    window.open(assignmentInformation, "_blank");
  };

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
      uploadFile(file);
      // Perform form submission logic
      console.log("Form submitted successfully");
    } else {
      alert("Please upload a PDF file before submitting");
    }
  };
  if (isUploading) return <Spinner />;
  return (
    <Table.Row>
      <div>{assignmentName}</div>
      <div>{teacher}</div>
      <div>
        {/* Render a button to trigger download */}
        <Button onClick={handleDownload}>View</Button>
      </div>
      <div>{formatDate(deadline)}</div>
      <div>PENDING</div>
      <form onSubmit={handleSubmit}>
        <div>
          <FileInput
            id="pdfFile" // Give it a descriptive ID
            accept=".pdf" // Specify that only PDF files are allowed
            type="file"
            onChange={handleFileChange} // Handle file change
          />
        </div>
        <Button size="small" type="submit">
          Submit
        </Button>
      </form>
    </Table.Row>
  );
}

export default AssesmentRow;
