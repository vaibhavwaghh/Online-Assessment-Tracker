import { useSelector } from "react-redux";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { useSearchParams } from "react-router-dom";
import AssessmentTableForTeacher from "../features/assesmentForTeachers/AssessmentTableTeacher";

function AllAssesmentOfHod() {
  const [searchParams] = useSearchParams();
  const subject = searchParams.get("subject");
  const teacherId = useSelector((state) => state.student.teacherId);
  const subjectId = useSelector((state) => state.student.subjectId);

  console.log("THIS IS TEACHER AND SUBJECT ID", teacherId, subjectId);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h2">All Assesment of {subject}</Heading>
      </Row>
      <hr />
      <Row type="horizontal">
        <AssessmentTableForTeacher subject={subject} />
      </Row>
    </>
  );
}

export default AllAssesmentOfHod;
