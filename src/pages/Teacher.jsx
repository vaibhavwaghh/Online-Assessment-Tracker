import StudentTable from "../features/student/StudentTable";
import TeacherTable from "../features/teacher/TeacherTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Teacher() {
  return (
    <div>
      <Row type="horizontal">
        <Heading as="h1">All Subjects</Heading>
        {/* <CabinTableOperations /> */}
      </Row>
      <Row>
        <TeacherTable />
      </Row>
      {/* <AddCabin /> */}
    </div>
  );
}

export default Teacher;
