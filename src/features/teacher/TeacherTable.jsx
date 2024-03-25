import { useSelector } from "react-redux";
import Table from "../../ui/Table";
import { useGetTeachersAllStudents } from "./useTeacher";
import Spinner from "../../ui/Spinner";
import TeacherRow from "./TeacherRow";

function TeacherTable() {
  const teacherId = useSelector((state) => state.student.teacherId);

  const { isLoading, data: studentData } = useGetTeachersAllStudents(teacherId);

  if (isLoading) return <Spinner />;
  return (
    // <Menus>
    <Table columns="0.6fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr">
      <Table.Header>
        <div>Roll no</div>
        <div>Student Name</div>
        <div>Submission date</div>
        <div>Status</div>
        <div>Approved</div>
        <div>Marks</div>
        <div> Student Assignment</div>
        <div>Update Marks</div>
      </Table.Header>
      <Table.Body
        data={studentData}
        render={(student) => <TeacherRow student={student} key={student.id} />}
      />
    </Table>
    // </Menus>
  );
}

export default TeacherTable;
