import Button from "../../../ui/Button";

import Table from "../../../ui/Table";
import { convertToCustomFormat, formatDate } from "../../../utils/helpers";

import { useDispatch } from "react-redux";

import { NavLink, useParams } from "react-router-dom";
import {
  updateAssignmentId,
  updateAssignmentMarks,
  updateLastDate,
} from "../../../redux/userSlice";

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
  }

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
          <Button onClick={handleClick}>View details</Button>
        </NavLink>
      </div>
    </Table.Row>
  );
}

export default AssesmentRowTeacher;
