import { useGetAllAssessment } from "../assessmentForStudents/useAssessment";
import Spinner from "../../ui/Spinner";
import EachAssesmentDashBoard from "./EachAssesmentDashBoard";

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
          <EachAssesmentDashBoard
            assessment={assessment}
            subjectId={subject.id}
            subjectName={subject.subjectName}
          />
        </>
      ))}
    </div>
  );
}

export default EachSubjectDasbboard;
