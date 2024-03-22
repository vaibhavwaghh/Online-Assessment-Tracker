import AssessmentTable from "../features/assessment/assessmentTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function AllAssessmentOfThisSubject() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Assessments</Heading>
      </Row>
      <Row>
        <AssessmentTable />
      </Row>
    </>
  );
}

export default AllAssessmentOfThisSubject;
