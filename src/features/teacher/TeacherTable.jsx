import { useSelector } from "react-redux";
import Table from "../../ui/Table";
import { useGetTeachersAllStudents } from "./useTeacher";
import Spinner from "../../ui/Spinner";
import TeacherRow from "./TeacherRow";
import { useSearchParams } from "react-router-dom";

function TeacherTable() {
  const [searchParams] = useSearchParams();
  let divNo = 3;
  if (searchParams?.get("division")) {
    divNo = searchParams?.get("division")[3];
    console.log("THIS IS DIV NUMBER", divNo);
  }

  const { isLoading, data: studentData } = useGetTeachersAllStudents(divNo);
  let sort;
  if (searchParams?.get("sortBy")) {
    sort = searchParams?.get("sortBy");
  }

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
