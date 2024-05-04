import { useDispatch, useSelector } from "react-redux";
import { useGetStatusOfAsssessment } from "../assessmentForStudents/useAssessment";
import Spinner from "../../ui/Spinner";
import TeacherRow from "./TeacherRow";
import { convertToCustomFormat } from "../../utils/helpers";
import ExportButton from "../operations/ExportButton";

import Table from "../../ui/Table";

function TeacherMiddleWare({ student, isTeacher, arr1, i }) {
  i++;
  const { rollNo, studentName, id: studentId } = student;
  const dispatch = useDispatch();
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

  function compareStudentName(obj1, obj2) {
    return obj1.studentName === obj2.studentName;
  }

  // Function to remove duplicates based on studentName property
  function removeDuplicatesByStudentName(array) {
    return array.filter(
      (item, index, self) =>
        index === self.findIndex((obj) => compareStudentName(obj, item))
    );
  }

  arr1.push(allData);
  const studentData = removeDuplicatesByStudentName(arr1);
  console.log("THIS IS UNIQUE DATA", studentData);
  if (isLoading) return <Spinner />;

  return (
    <>
      {i === 1 && (
        <>
          {isTeacher ? <ExportButton studentData={studentData} /> : ""}

          <Table.Header>
            <div>Roll no</div>
            <div>Name</div>
            <div>Submission date</div>
            <div>Status</div>
            <div>Approved</div>
            <div>Marks</div>
            <div>STUDENTS PDF</div>
            {isTeacher ? <div>Update Marks</div> : ""}
          </Table.Header>
        </>
      )}
      <TeacherRow allData={allData} isTeacher={isTeacher} />
    </>
  );
}

export default TeacherMiddleWare;
