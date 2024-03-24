import { useState } from "react";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Table from "../../ui/Table";
import { convertToCustomFormat, formatDate } from "../../utils/helpers";

import Spinner from "../../ui/Spinner";
import { useDispatch, useSelector } from "react-redux";
import AssesmentFile from "../assessmentForStudents/AssesmentFile";
import { NavLink, useParams } from "react-router-dom";

function AssesmentRowTeacher({ assesment }) {
  const {
    created_at,
    assignmentName,
    description,
    assignedMarks,
    deadline,
    assignmentInformation,
    id: assignmentId,
  } = assesment;

  const handleDownload = () => {
    window.open(assignmentInformation, "_blank");
  };
  const { subjectName } = useParams();
  let goto = `/teacher/${subjectName}/${assignmentName}`;
  return (
    <Table.Row>
      <div>{assignmentName}</div>
      <div>{convertToCustomFormat(created_at)}</div>

      <div>{formatDate(deadline)}</div>
      <div>{assignedMarks}</div>
      <div>{description}</div>
      <div>
        <Button onClick={handleDownload}>View</Button>
      </div>
      <div>
        <NavLink to={goto}>
          <Button>View details</Button>
        </NavLink>
      </div>
    </Table.Row>
  );
}

export default AssesmentRowTeacher;
