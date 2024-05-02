import { useSelector } from "react-redux";
import Row from "./Row";
import Heading from "./Heading";
import TeacherAllOperations from "../features/operations/TeacherAllOperations";
import TeacherTable from "../features/teacher/TeacherTable";
import ButtonText from "./ButtonText";
import { useMoveBack } from "../hooks/useMoveBack";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

function AllStudentsOfTeacher() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentUrl = location.pathname;
  let newUrl = currentUrl.split("/").slice(0, -1).join("/");
  // Function to navigate to the desired URL
  function goSomewhere() {
    navigate(newUrl);
  }
  const [searchParams] = useSearchParams();
  let division = searchParams.get("division");
  // const moveBack = useMoveBack();
  return (
    <>
      <>
        <Row type="horizontal">
          <Heading as="h1">All Students</Heading>
          <ButtonText onClick={goSomewhere}>&larr; Back</ButtonText>
          <TeacherAllOperations />
        </Row>
        {division ? (
          <Row>
            <TeacherTable />
          </Row>
        ) : (
          <h1>Select a division</h1>
        )}
      </>
    </>
  );
}

export default AllStudentsOfTeacher;
