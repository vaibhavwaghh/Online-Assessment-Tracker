import AddNewAssessment from "./assessmentForTeachers/AddNewAssessment";
import AssessmentTableForTeacher from "./assessmentForTeachers/AssessmentTableTeacher";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";

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
