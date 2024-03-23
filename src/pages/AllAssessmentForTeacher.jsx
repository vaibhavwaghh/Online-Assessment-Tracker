import AddNewAssessment from "../features/assesmentForTeachers/AddNewAssessment";
import AssessmentTableForTeacher from "../features/assesmentForTeachers/AssessmentTableTeacher";
import Button from "../ui/Button";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function AllAssessmentForTeacher() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Assessments</Heading>
        <AddNewAssessment />
      </Row>
      <Row>
        <AssessmentTableForTeacher />
      </Row>
    </>
  );
}

export default AllAssessmentForTeacher;
