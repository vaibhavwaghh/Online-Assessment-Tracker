import { useSelector } from "react-redux";
import Row from "./Row";
import Heading from "./Heading";
import TeacherAllOperations from "../features/operations/TeacherAllOperations";
import TeacherTable from "../features/teacher/TeacherTable";

function AllStudentsOfTeacher() {
  return (
    <>
      <>
        <Row type="horizontal">
          <Heading as="h1">All Students</Heading>
          <TeacherAllOperations />
        </Row>
        <Row>
          <TeacherTable />
        </Row>
        {/* <AddCabin /> */}
      </>
    </>
  );
}

export default AllStudentsOfTeacher;
