import { useDispatch, useSelector } from "react-redux";
import AssessmentTable from "../students/assessmentForStudents/AssessmentTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { updatetotalNumberOfSubmitted } from "../redux/userSlice";

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
  const dispatch = useDispatch();
  // dispatch(updatetotalNumberOfSubmitted(0));
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
