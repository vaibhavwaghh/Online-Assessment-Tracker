import { useSelector } from "react-redux";
import { useGetStatusOfAsssessment } from "../assessmentForStudents/useAssessment";
import Spinner from "../../ui/Spinner";
import TeacherRow from "./TeacherRow";
import { convertToCustomFormat } from "../../utils/helpers";

function TeacherMiddleWare({ student }) {
  const { rollNo, studentName, id: studentId } = student;

  const assignedMarks = useSelector((state) => state.student.marks);
  const asssignmentId = useSelector((state) => state.student.assignmentId);
  const subjectId = useSelector((state) => state.student.subjectId);

  const allIds = { asssignmentId, subjectId, studentId };

  const { isLoading, data } = useGetStatusOfAsssessment(allIds);
  let status1 = "PENDING";
  let approved = "NO";
  let marks = `0`;
  let dataOfSubmission = "-";
  let solution = "";
  if (data) {
    status1 = data.status === true ? "SUBMITTED" : "PENDING";
    approved = data.approved === true ? "YES" : "NO";
    dataOfSubmission = convertToCustomFormat(data.created_at);
    solution = data.solutionPdf;
  }
  if (data?.submittedMarks) {
    marks = data.submittedMarks;
  }

  let allData = {
    status1,
    approved,
    marks,
    dataOfSubmission,
    assignedMarks,
    studentId,
    rollNo,
    studentName,
    solution,
  };
  if (isLoading) return <Spinner />;
  return (
    <>
      <TeacherRow allData={allData} />
    </>
  );
}

export default TeacherMiddleWare;
