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
import styled from "styled-components";

function AssesmentRow({ assesment, numberOfSubmitted }) {
  const StyledButton = styled.button`
    width: 100%;
    text-align: left;
    background: none;
    border: none;
    padding: 1.2rem 2.4rem;
    font-size: 1.4rem;
    transition: all 0.2s;

    display: flex;
    align-items: center;
    gap: 1.6rem;

    &:hover {
      background-color: var(--color-grey-50);
    }

    & svg {
      width: 1.6rem;
      height: 1.6rem;
      color: var(--color-grey-400);
      transition: all 0.3s;
    }
  `;
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

  const { isLoading, data } = useGetStatusOfAsssessment(allIds);

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
