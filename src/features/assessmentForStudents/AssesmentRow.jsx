import { useEffect, useState } from "react";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Table from "../../ui/Table";
import { formatDate } from "../../utils/helpers";
import { useGetStatusOfAsssessment } from "./useAssessment";
import Spinner from "../../ui/Spinner";
import { useDispatch, useSelector } from "react-redux";

import AssesmentFile from "./AssesmentFile";
import {
  updateAllIds,
  updateAssignmentId,
  updateData,
  updatetotalNumberOfApproved,
  updatetotalNumberOfSubmitted,
} from "../../redux/userSlice";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";
import { useNavigate } from "react-router-dom";
import { HiEye } from "react-icons/hi2";
import styled from "styled-components";
import EachAssesmentBox from "./EachAssesmentBox";
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

  // const numberOfApproved = useSelector(
  //   (state) => state.student.totalNumberOfApproved
  // );
  // console.log(
  //   "THIS IS NUMBER OF SUBMITTED AND APPROVED",
  //   numberOfApproved,
  //   numberOfSubmitted
  // );
  let allIds = { asssignmentId, subjectId, studentId };

  const { isLoading, data } = useGetStatusOfAsssessment(allIds);
  // useEffect(() => {
  //   if (data?.status) {
  //     const newNumberOfSubmitted = numberOfSubmitted + 1;
  //     console.log(
  //       "THIS IS NUMBER OF SUBMITTED to dispatch",
  //       newNumberOfSubmitted
  //     );
  //     dispatch(updatetotalNumberOfSubmitted(newNumberOfSubmitted));
  //   }
  // }, [data?.status]);
  // console.log("DATA FROM STATUS", data);
  const handleDownload1 = () => {
    window.open(assignmentInformation, "_blank");
  };
  // const handleDownload2 = () => {
  //   window.open(data?.solutionPdf, "_blank");
  // };
  // if (isLoading) return <Spinner />;
  // if (data?.status) {
  //   numberOfSubmitted++;
  //   console.log("THIS IS NUMBER OF SUBMITTED to dispatch", numberOfSubmitted);
  //   dispatch(updatetotalNumberOfSubmitted(numberOfSubmitted));
  // }
  // if (data?.status) {
  //   let newTotalSubmitted = Number(numberOfSubmitted) + 1;
  //   dispatch(updatetotalNumberOfSubmitted(newTotalSubmitted));
  // }
  // if (data?.approved) {
  //   let newTotalApproved = Number(numberOfApproved) + 1;
  //   dispatch(updatetotalNumberOfApproved(newTotalApproved));
  // }
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
        {/* Render a button to trigger download */}
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
      {/* {data?.submittedMarks ? (
        <div style={{ color: "BLUE" }}>
          {data.submittedMarks}/{assignedMarks}
        </div>
      ) : (
        <div style={{ color: "red" }}>0/{assignedMarks}</div>
      )} */}
      <button
        style={{ backgroundColor: "white", color: "black" }}
        onClick={handleClick}
      >
        {<HiEye />}
      </button>
      {/* <Modal> */}
      {/* <Menus.Menu>
        <Menus.Toggle id={asssignmentId} />
        <Menus.List id={asssignmentId}>
          <Menus.Button
            icon={<HiEye />}
            onClick={() => navigate(`/assesment/${asssignmentId}`)}
          >
            See Details
          </Menus.Button>
        </Menus.List>
      </Menus.Menu> */}
      {/* </Modal> */}
      {/* <div>{description}</div>
      <div>
        {data?.solutionPdf ? (
          <Button onClick={handleDownload2}>View</Button>
        ) : (
          "-"
        )}
      </div>
      <AssesmentFile allIds={allIds} /> */}
    </Table.Row>
  );
}

export default AssesmentRow;
