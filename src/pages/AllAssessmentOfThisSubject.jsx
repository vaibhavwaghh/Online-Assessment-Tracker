import { useSelector } from "react-redux";
import AssessmentTable from "../students/assessmentForStudents/AssessmentTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function AllAssessmentOfThisSubject() {
  const totalAssessment = useSelector(
    (state) => state.student.totalNumberOfAssessment
  );
  // const numberOfSubmitted = useSelector(
  //   (state) => state.student.totalNumberOfSubmitted
  // );
  // const numberOfApproved = useSelector(
  //   (state) => state.student.totalNumberOfApproved
  // );
  // const dispatch = useDispatch();
  // dispatch(updatetotalNumberOfSubmitted(0));
  console.log("THIS IS TOTAL ASSESSMENT", totalAssessment);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Assessments</Heading>
        <span>
          TOTAL :- <span>{totalAssessment} Assessments</span>
        </span>
      </Row>
      <Row>
        <AssessmentTable />
      </Row>
    </>
  );
}

export default AllAssessmentOfThisSubject;
