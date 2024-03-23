import { useState } from "react";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Table from "../../ui/Table";
import { formatDate } from "../../utils/helpers";
import { useGetStatusOfAsssessment } from "./useAssessment";
import Spinner from "../../ui/Spinner";
import { useDispatch, useSelector } from "react-redux";

import AssesmentFile from "./AssesmentFile";
function AssesmentRow({ assesment }) {
  const {
    assignmentName,
    deadline,
    assignmentInformation,
    id: asssignmentId,
    teacherId: { teacherName },
  } = assesment;
  const subjectId = useSelector((state) => state.student.subjectId);
  const studentId = useSelector((state) => state.student.studentId);
  // Function to handle the download of the PDF file
  let allIds = { asssignmentId, subjectId, studentId };

  const { isLoading, data } = useGetStatusOfAsssessment(allIds);
  // console.log("DATA FROM STATUS", data);
  const handleDownload = () => {
    window.open(assignmentInformation, "_blank");
  };

  // if (isLoading) return <Spinner />;
  return (
    <Table.Row>
      <div>{assignmentName}</div>
      <div>{teacherName}</div>
      <div>
        {/* Render a button to trigger download */}
        <Button onClick={handleDownload}>View</Button>
      </div>
      <div>{formatDate(deadline)}</div>
      {data === true ? (
        <span style={{ color: "BLUE" }}>SUBMITTED</span>
      ) : (
        <span style={{ color: "red" }}>PENDING</span>
      )}
      <AssesmentFile allIds={allIds} />
    </Table.Row>
  );
}

export default AssesmentRow;
