import { useSelector } from "react-redux";
import AssessmentTable from "../features/assessmentForStudents/assessmentTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function AllAssessmentOfThisSubject() {
  const totalAssesment = useSelector(
    (state) => state.student.totalNumberOfAssesment
  );
  const numberOfSubmitted = useSelector(
    (state) => state.student.totalNumberOfSubmitted
  );
  const numberOfApproved = useSelector(
    (state) => state.student.totalNumberOfApproved
  );
  console.log("THIS IS TOTAL ASSESMENT", totalAssesment);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Assessments</Heading>
        <span>
          TOTAL :- <span>{totalAssesment}</span>
        </span>

        <span>SUBMITTED :- {numberOfSubmitted}</span>
        <span>APPROVED :- {numberOfApproved}</span>
      </Row>
      <Row>
        <AssessmentTable />
      </Row>
    </>
  );
}

export default AllAssessmentOfThisSubject;
