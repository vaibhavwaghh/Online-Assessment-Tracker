import { useSelector } from "react-redux";
import Row from "./Row";
import Heading from "./Heading";
import TeacherAllOperations from "../features/operations/TeacherAllOperations";
import TeacherTable from "../features/teacher/TeacherTable";
import ButtonText from "./ButtonText";
import { useMoveBack } from "../hooks/useMoveBack";

function AllStudentsOfTeacher() {
  // Function to navigate to the desired URL
  function goSomewhere() {
    console.log("THIS IS SOMEWHERE");
  }
  // const moveBack = useMoveBack();
  return (
    <>
      <>
        <Row type="horizontal">
          <Heading as="h1">All Students</Heading>
          <ButtonText onClick={goSomewhere}>&larr; Back</ButtonText>
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
