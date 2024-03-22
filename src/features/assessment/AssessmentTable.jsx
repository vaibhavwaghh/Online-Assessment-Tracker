import { useParams } from "react-router-dom";
import Table from "../../ui/Table";
import useAssessment from "./useAssessment";
import AssesmentRow from "./AssesmentRow";
import Spinner from "../../ui/Spinner";

function AssessmentTable() {
  const { subjectName } = useParams();
  console.log(subjectName);

  const { assessmentData, isLoading, teacher } = useAssessment(subjectName);
  console.log(assessmentData);
  if (isLoading) return <Spinner />;
  return (
    <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Table.Header>
        <div></div>
        <div>Name</div>
        <div>Teacher</div>
        <div>Status</div>
        <div>Marks</div>
        <div></div>
      </Table.Header>
      <Table.Body
        data={assessmentData}
        render={(assesment) => (
          <AssesmentRow
            teacher={teacher}
            assesment={assesment}
            key={assesment.id}
          />
        )}
      />
    </Table>
  );
}

export default AssessmentTable;
