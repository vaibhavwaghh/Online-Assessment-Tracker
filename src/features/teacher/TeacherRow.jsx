import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import Table from "../../ui/Table";
import { useGetStatusOfAsssessment } from "../assessmentForStudents/useAssessment";
import Spinner from "../../ui/Spinner";
import { convertToCustomFormat } from "../../utils/helpers";
import UpdateStudentForm from "../assesmentForTeachers/UpdateStudentForm";
import UpdateStudentAssesment from "../assesmentForTeachers/UpdateStudentAssesment";
import { updatestudentId } from "../../redux/userSlice";

function TeacherRow({ student }) {
  const { rollNo, studentName, id: studentId } = student;

  const assignedMarks = useSelector((state) => state.student.marks);
  const asssignmentId = useSelector((state) => state.student.assignmentId);

  const subjectId = useSelector((state) => state.student.subjectId);

  const allIds = { asssignmentId, subjectId, studentId };

  const { isLoading, data } = useGetStatusOfAsssessment(allIds);
  if (isLoading) return <Spinner />;
  // console.log("data in st row", data);
  let status1 = "PENDING";
  let approved = "NO";
  let marks = `0`;
  let dataOfSubmission = "-";
  let button = "Update ";
  if (data) {
    status1 = data.status === true ? "SUBMITTED" : "PENDING";
    approved = data.approved === true ? "YES" : "NO";
    dataOfSubmission = convertToCustomFormat(data.created_at);
    // view = data.solutionPdf;
  }
  if (data?.submittedMarks) {
    marks = data.submittedMarks;
  }

  const handleDownload = () => {
    window.open(data.solutionPdf, "_blank");
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
        {data?.solutionPdf ? (
          <Button onClick={handleDownload}>VIEW</Button>
        ) : (
          <div>-</div>
        )}

        {data?.solutionPdf ? (
          <UpdateStudentAssesment studentId={studentId} />
        ) : (
          <div>-</div>
        )}
      </Table.Row>
    </>
  );
}

export default TeacherRow;
