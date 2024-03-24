import { useParams } from "react-router-dom";
import Table from "../../ui/Table";
import { useSelector } from "react-redux";
import Spinner from "../../ui/Spinner";
import { useTeacherAllAssignment } from "../teacher/useTeacher";
import AssesmentRowTeacher from "./AssesmentRowTeacher";

function AssessmentTableForTeacher() {
  const { subjectName } = useParams();
  console.log(subjectName);

  const teacherId = useSelector((state) => state.student.teacherId);
  const subjectId = useSelector((state) => state.student.subjectId);

  const allIds = { teacherId, subjectId };
  console.log(allIds);
  const { isLoading, data } = useTeacherAllAssignment(allIds);
  if (isLoading) return <Spinner />;
  console.log("ALL ASS OF TEACHER", data);
  // const { assessmentData, isLoading } = useGetAllAssessment(subjectName);
  // console.log(assessmentData);
  // if (isLoading) return <Spinner />;
  return (
    <Table columns="150px 200px 150px 100px 100px 150px 200px">
      <Table.Header>
        <div>Name</div>
        <div>Created</div>
        <div>Deadline</div>
        <div>Marks</div>
        <div>Description</div>
        <div>Assignment PDF</div>
        <div>Student Details</div>
      </Table.Header>
      <Table.Body
        data={data}
        render={(assesment) => (
          <AssesmentRowTeacher assesment={assesment} key={assesment.id} />
        )}
      />
    </Table>
  );
}

export default AssessmentTableForTeacher;
