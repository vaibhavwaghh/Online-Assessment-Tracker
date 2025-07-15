import Button from "../../ui/Button";

import Table from "../../ui/Table";
import { formatDate } from "../../utils/helpers";
import { useGetStatusOfAsssessment } from "./useAssessment";

import { useDispatch, useSelector } from "react-redux";

import {
  updateAllIds,
  updateAssignmentId,
  updateData,
} from "../../redux/userSlice";

import { useNavigate } from "react-router-dom";
import { HiEye } from "react-icons/hi2";

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
  const navigate = useNavigate();
  const subjectId = useSelector((state) => state.student.subjectId);
  const studentId = useSelector((state) => state.student.studentId);

  let allIds = { asssignmentId, subjectId, studentId };

  const { data } = useGetStatusOfAsssessment(allIds);

  const handleDownload1 = () => {
    window.open(assignmentInformation, "_blank");
  };

  function handleClick() {
    navigate(`${assignmentName}`);
    dispatch(updateAllIds(allIds));
    let newdata = {
      assignmentName,
      teacherName,

      assignedMarks,
      description,
      data,
    };
    dispatch(updateData(newdata));
  }
  return (
    <Table.Row>
      <div>{assignmentName}</div>
      <div>{teacherName}</div>
      <div>
        <Button onClick={handleDownload1}>View</Button>
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

      <button
        style={{ backgroundColor: "white", color: "black" }}
        onClick={handleClick}
      >
        {<HiEye />}
      </button>
    </Table.Row>
  );
}

export default AssesmentRow;
