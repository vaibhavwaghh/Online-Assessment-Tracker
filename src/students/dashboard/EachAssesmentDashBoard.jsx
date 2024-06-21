import { useGetStatusOfAsssessment } from "../assessmentForStudents/useAssessment";

import styled from "styled-components";

import DetailsModel from "./DetailsModel";
import { useSelector } from "react-redux";

const Box = styled.div`
  display: inline-block; /* Display boxes inline */
  vertical-align: top; /* Align boxes to the top */
  border: 1px solid #ccc;
  padding: 10px;
  width: 30rem;
  margin-right: 2rem; /* Add margin between boxes */
  margin-bottom: 1rem;
  border-radius: 5px;

  span {
    display: block;
    margin-bottom: 5px;
  }

  .blue {
    color: blue;
  }

  .red {
    color: red;
  }

  .status-container {
    display: flex;
    align-items: center;
  }
`;

function EachAssesmentDashBoard({ assessment, subjectId, subjectName }) {
  const {
    assignmentName,
    deadline,
    assignmentInformation,
    id: asssignmentId,
    teacherId: { teacherName },
    description,
    assignedMarks,
  } = assessment;
  const studentId = useSelector((state) => state.student.studentId);

  let allIds = { asssignmentId, subjectId, studentId };
  const { data } = useGetStatusOfAsssessment(allIds);

  let newdata = {
    assignmentName,
    teacherName,
    assignmentInformation,

    assignedMarks,
    description,
    data,
  };

  return (
    <>
      <Box>
        <h4 key={assessment.id}>Name :- {assessment.assignmentName}</h4>
        <span>Deadline :- {assessment.deadline}</span>
        <span>Teacher :- {assessment.teacherId.teacherName}</span>
        <div className="status-container">
          <span>Status:-</span>
          {data?.status ? (
            <div className="blue"> SUBMITTED</div>
          ) : (
            <div className="red"> PENDING</div>
          )}
        </div>
        <div className="status-container">
          <span>Approved:-</span>
          {data?.approved ? (
            <div className="blue"> YES</div>
          ) : (
            <div className="red"> NO</div>
          )}
        </div>
        <div className="status-container">
          <span>Details:-</span>
          <DetailsModel newdata={newdata} allIds={allIds} />
        </div>
      </Box>
    </>
  );
}

export default EachAssesmentDashBoard;
