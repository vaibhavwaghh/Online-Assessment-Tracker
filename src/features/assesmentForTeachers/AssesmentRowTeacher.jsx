import { useState } from "react";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Table from "../../ui/Table";
import { formatDate } from "../../utils/helpers";

import Spinner from "../../ui/Spinner";
import { useDispatch, useSelector } from "react-redux";
import AssesmentFile from "../assessmentForStudents/AssesmentFile";

function AssesmentRowTeacher({ assesment }) {
  const {
    created_at,
    assignmentName,

    deadline,
    assignmentInformation,
    id: assignmentId,
  } = assesment;

  const handleDownload = () => {
    window.open(assignmentInformation, "_blank");
  };

  return (
    <Table.Row>
      <div>{assignmentName}</div>
      <div>{created_at}</div>

      <div>{formatDate(deadline)}</div>
      <div>
        <Button onClick={handleDownload}>View</Button>
      </div>
      <div>
        <Button>View details</Button>
      </div>
    </Table.Row>
  );
}

export default AssesmentRowTeacher;
