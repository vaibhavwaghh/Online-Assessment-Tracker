import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import AssessmentTableForHod from "./AssessmentTableForHod";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import PropTypes from "prop-types";

import { useDispatch } from "react-redux";
import { updateSubjectName } from "../../redux/userSlice";

function AllAssessmentOfHod({ isPrincipal }) {
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

AllAssessmentOfHod.propTypes = {
  isPrincipal: PropTypes.number,
};

export default AllAssessmentOfHod;
