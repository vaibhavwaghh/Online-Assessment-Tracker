import StudentTable from "../features/student/StudentTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Student() {
  return (
    <div>
      <Row type="horizontal">
        <Heading as="h1">All Subjects</Heading>
        {/* <CabinTableOperations /> */}
      </Row>
      <Row>
        <StudentTable />
      </Row>
      {/* <AddCabin /> */}
    </div>
  );
}

export default Student;
