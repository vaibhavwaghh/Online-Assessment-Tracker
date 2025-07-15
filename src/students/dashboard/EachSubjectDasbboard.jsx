import { useGetAllAssessment } from "../assessmentForStudents/useAssessment";
import Spinner from "../../ui/Spinner";
import EachAssessmentDashBoard from "./EachAssessmentDashBoard";
import PropTypes from "prop-types";

function EachSubjectDasbboard({ subject }) {
  console.log("THIS IS EACH SUBJECT ID", subject);
  const { assessmentData, isLoading } = useGetAllAssessment(
    subject.subjectName
  );
  if (isLoading) return <Spinner />;

  return (
    <div>
      <h1>{subject.subjectName}</h1>
      {assessmentData.map((assessment) => (
        <>
          <EachAssessmentDashBoard
            assessment={assessment}
            subjectId={subject.id}
            subjectName={subject.subjectName}
          />
        </>
      ))}
    </div>
  );
}

EachSubjectDasbboard.propTypes = {
  subject: PropTypes.object.isRequired,
};

export default EachSubjectDasbboard;
