import { useState } from "react";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Table from "../../ui/Table";
import { formatDate } from "../../utils/helpers";
import { useGetStatusOfAsssessment } from "./useAssessment";
import Spinner from "../../ui/Spinner";
import { useDispatch, useSelector } from "react-redux";

import AssesmentFile from "./AssesmentFile";
import {
  updateAssignmentId,
  updatetotalNumberOfApproved,
  updatetotalNumberOfSubmitted,
} from "../../redux/userSlice";
function AssesmentRow({ assesment }) {
  const {
    assignmentName,
    deadline,
    assignmentInformation,
    id: asssignmentId,
    teacherId: { teacherName },
    description,
    assignedMarks,
  } = assesment;
  const dispatch = useDispatch();
  dispatch(updateAssignmentId(asssignmentId));
  const subjectId = useSelector((state) => state.student.subjectId);
  const studentId = useSelector((state) => state.student.studentId);
  const numberOfSubmitted = useSelector(
    (state) => state.student.totalNumberOfSubmitted
  );
  const numberOfApproved = useSelector(
    (state) => state.student.totalNumberOfApproved
  );
  console.log(
    "THIS IS NUMBER OF SUBMITTED AND APPROVED",
    numberOfApproved,
    numberOfSubmitted
  );
  let allIds = { asssignmentId, subjectId, studentId };

  const { isLoading, data } = useGetStatusOfAsssessment(allIds);

  // console.log("DATA FROM STATUS", data);
  const handleDownload = () => {
    window.open(assignmentInformation, "_blank");
  };

  // if (isLoading) return <Spinner />;
  // if (data?.status) {
  //   let newTotalSubmitted = Number(numberOfSubmitted) + 1;
  //   dispatch(updatetotalNumberOfSubmitted(newTotalSubmitted));
  // }
  // if (data?.approved) {
  //   let newTotalApproved = Number(numberOfApproved) + 1;
  //   dispatch(updatetotalNumberOfApproved(newTotalApproved));
  // }
  return (
    <Table.Row>
      <div>{assignmentName}</div>
      <div>{teacherName}</div>
      <div>
        {/* Render a button to trigger download */}
        <Button onClick={handleDownload}>View</Button>
      </div>
      <div>{formatDate(deadline)}</div>
      {data?.status ? (
        <div style={{ color: "BLUE" }}>SUBMITTED</div>
      ) : (
        <div style={{ color: "red" }}>PENDING</div>
      )}
      {data?.approved ? (
        <div style={{ color: "BLUE" }}>YES</div>
      ) : (
        <div style={{ color: "red" }}>NO</div>
      )}
      {data?.submittedMarks ? (
        <div style={{ color: "BLUE" }}>
          {data.submittedMarks}/{assignedMarks}
        </div>
      ) : (
        <div style={{ color: "red" }}>0/{assignedMarks}</div>
      )}

      <div>{description}</div>

      <AssesmentFile allIds={allIds} />
    </Table.Row>
  );
}

export default AssesmentRow;
