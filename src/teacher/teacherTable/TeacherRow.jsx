import Button from "../../ui/Button";
import Table from "../../ui/Table";

import UpdateStudentAssesment from "../allAssesment/assesmentForTeachers/UpdateStudentAssesment";

function TeacherRow({ allData, isTeacher }) {
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
        {isTeacher ? (
          solution !== "" ? (
            <UpdateStudentAssesment studentId={studentId} />
          ) : (
            <div>-</div>
          )
        ) : (
          ""
        )}
      </Table.Row>
    </>
  );
}

export default TeacherRow;
