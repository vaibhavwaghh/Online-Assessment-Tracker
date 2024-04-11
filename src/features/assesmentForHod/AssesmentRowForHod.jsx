import { useState } from "react";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Table from "../../ui/Table";
import { convertToCustomFormat, formatDate } from "../../utils/helpers";

import Spinner from "../../ui/Spinner";
import { useDispatch, useSelector } from "react-redux";
import AssesmentFile from "../assessmentForStudents/AssesmentFile";
import {
  NavLink,
  useParams,
  useSearchParams,
  useLocation,
} from "react-router-dom";
import {
  updateAssignmentId,
  updateAssignmentMarks,
  updateLastDate,
} from "../../redux/userSlice";

function AssesmentRowHod({ assesment, isPrincipal = 0 }) {
  console.log("IS PRINCIPAL", isPrincipal);
  const {
    created_at,
    assignmentName,
    description,
    assignedMarks,
    teacherId: { teacherName },
    deadline,
    assignmentInformation,
    id: assignmentId,
  } = assesment;
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const handleDownload = () => {
    window.open(assignmentInformation, "_blank");
  };

  function handleClick() {
    console.log(
      "THIS IS ASSID AND ASS MARKS FROM ASSROWTEACHEER",
      assignedMarks,
      assignmentId
    );
    dispatch(updateAssignmentMarks(assignedMarks));
    dispatch(updateAssignmentId(assignmentId));
    dispatch(updateLastDate(formatDate(deadline)));
    // searchParams.set("assesment", assignmentName);
    // setSearchParams(searchParams);
  }
  const location = useLocation();
  const currentUrl = location.pathname;
  let subjectName = searchParams.get("subject");

  let goto;
  // if (isPrincipal) {
  goto = `${currentUrl}/${assignmentName}`;
  // } else {
  // goto = `${currentUrl}${assignmentName}`;
  // }
  return (
    <Table.Row>
      <div>{assignmentName}</div>
      <div>{teacherName}</div>
      <div>{convertToCustomFormat(created_at)}</div>

      <div>{formatDate(deadline)}</div>
      <div>{assignedMarks}</div>
      <div>{description}</div>
      <div>
        {/* <Button onClick={handleDownload}>View</Button> */}

        <Button onClick={handleDownload}>View PDF</Button>
      </div>
      <div>
        {/* <Button onClick={handleClick}>View details</Button> */}
        <NavLink to={goto}>
          <Button onClick={handleClick}>View details</Button>
        </NavLink>
      </div>
    </Table.Row>
  );
}

export default AssesmentRowHod;
