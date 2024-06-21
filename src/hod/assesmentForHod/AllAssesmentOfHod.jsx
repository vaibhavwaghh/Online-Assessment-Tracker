import { useSelector } from "react-redux";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import { useSearchParams } from "react-router-dom";

import AssessmentTableForHod from "./AssesmentTableForHod";
import { useDispatch } from "react-redux";
import { updateSubjectName } from "../../redux/userSlice";

function AllAssesmentOfHod({ isPrincipal }) {
  const [searchParams] = useSearchParams();
  const subject = searchParams.get("subject");
  const teacherId = useSelector((state) => state.student.teacherId);
  const subjectId = useSelector((state) => state.student.subjectId);
  const dispatch = useDispatch();
  dispatch(updateSubjectName(subject));
  return (
    <>
      <Row type="horizontal">
        <Heading as="h2">All Assesment of {subject}</Heading>
      </Row>
      <hr />
      <Row type="horizontal">
        <AssessmentTableForHod
          isPrincipal={isPrincipal}
          teacherId={teacherId}
          subjectId={subjectId}
        />
      </Row>
    </>
  );
}

export default AllAssesmentOfHod;
