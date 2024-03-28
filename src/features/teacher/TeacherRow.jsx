import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import Table from "../../ui/Table";
import { useGetStatusOfAsssessment } from "../assessmentForStudents/useAssessment";
import Spinner from "../../ui/Spinner";
import { convertToCustomFormat } from "../../utils/helpers";
import UpdateStudentForm from "../assesmentForTeachers/UpdateStudentForm";
import UpdateStudentAssesment from "../assesmentForTeachers/UpdateStudentAssesment";
import { updatestudentId } from "../../redux/userSlice";
import { useEffect } from "react";

function TeacherRow({ allData }) {
  // console.log("data in st row", data);
  const {
    rollNo,
    studentName,
    dataOfSubmission,
    status1,
    approved,
    marks,
    assignedMarks,
    studentId,
    solution,
  } = allData;
  // const assignedMarks1 = useSelector((state) => state.student.marks);
  // const asssignmentId = useSelector((state) => state.student.assignmentId);
  // const subjectId = useSelector((state) => state.student.subjectId);
  // allData.map((student) => {
  //   const { id: studentId } = student;
  //   const allIds = { asssignmentId, subjectId, studentId };
  //   const { isLoading, data } = useGetStatusOfAsssessment(allIds);
  //   return { studentId, data, isLoading };
  // });
  // console.log("THIS IS ALL DATA", allData);

  const handleDownload = () => {
    window.open(solution, "_blank");
  };

  return (
    <>
      <Table.Row>
        <div>{rollNo}</div>
        <div>{studentName}</div>
        <div>{dataOfSubmission}</div>
        <div style={{ color: status1 === "PENDING" ? "red" : "blue" }}>
          {status1}
        </div>

        <div style={{ color: approved === "NO" ? "red" : "blue" }}>
          {approved}
        </div>
        <div>
          {marks}/{assignedMarks}
        </div>
        {solution !== "" ? (
          <Button onClick={handleDownload}>VIEW</Button>
        ) : (
          <div>-</div>
        )}

        {solution !== "" ? (
          <UpdateStudentAssesment studentId={studentId} />
        ) : (
          <div>-</div>
        )}
      </Table.Row>
    </>
  );
}

export default TeacherRow;
