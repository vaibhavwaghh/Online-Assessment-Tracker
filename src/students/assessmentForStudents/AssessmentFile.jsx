import { useState } from "react";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import { useUploadAssessment } from "./useAssessment";
import Spinner from "../../ui/Spinner";
import PropTypes from "prop-types";

function AssessmentFile({ allIds }) {
  const [fileUploaded, setFileUploaded] = useState(false);
  const [file, setFile] = useState(null);
  const { isUploading, uploadFile } = useUploadAssessment(allIds);

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      setFile(event.target.files[0]);
      setFileUploaded(true);
    } else {
      setFile(null);
      setFileUploaded(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (fileUploaded && file) {
      console.log("File uploaded:", file);
      let insertData = { file, ...allIds };
      uploadFile(insertData);
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
          id="pdfFile"
          accept=".pdf"
          type="file"
          onChange={handleFileChange}
        />
        <Button size="small" type="submit">
          Submit
        </Button>{" "}
      </div>
    </form>
  );
}

AssessmentFile.propTypes = {
  allIds: PropTypes.object.isRequired,
};

export default AssessmentFile;
