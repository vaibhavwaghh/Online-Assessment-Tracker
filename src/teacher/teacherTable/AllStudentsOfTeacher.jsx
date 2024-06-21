import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import TeacherAllOperations from "../allAssesment/assesmentForTeachers/TeacherAllOperations";
import TeacherTable from "./TeacherTable";
import ButtonText from "../../ui/ButtonText";

import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

function AllStudentsOfTeacher() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentUrl = location.pathname;
  let newUrl = currentUrl.split("/").slice(0, -1).join("/");

  function goSomewhere() {
    navigate(newUrl);
  }
  const [searchParams] = useSearchParams();
  let division = searchParams.get("division");

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
