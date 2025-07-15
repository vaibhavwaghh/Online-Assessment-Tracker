import { useSelector } from "react-redux";
import AssessmentTable from "../students/assessmentForStudents/AssessmentTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function AllAssessmentOfThisSubject() {
  const totalAssesment = useSelector(
    (state) => state.student.totalNumberOfAssesment
  );
  
  console.log("THIS IS TOTAL ASSESMENT", totalAssesment);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Assessments</Heading>
        <span>
          TOTAL :- <span>{totalAssesment} Assesments</span>
        </span>
      </Row>
      <Row>
        <AssessmentTable />
      </Row>
    </>
  );
}

export default AllAssessmentOfThisSubject;
