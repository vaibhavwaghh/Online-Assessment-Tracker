import { useParams } from "react-router-dom";
import Table from "../../ui/Table";

import AssesmentRow from "./AssesmentRow";
import Spinner from "../../ui/Spinner";
import { useGetAllAssessment } from "./useAssessment";

function AssessmentTable() {
  const { subjectName } = useParams();
  console.log(subjectName);

  const { assessmentData, isLoading } = useGetAllAssessment(subjectName);
  console.log(assessmentData);
  if (isLoading) return <Spinner />;
  return (
    <Table columns="100px 100px 120px 100px 100px 120px 100px 100px 100px">
      <Table.Header>
        <div>Name</div>
        <div>Teacher</div>
        <div>Assignment PDF</div>
        <div>Deadline</div>
        <div>Status</div>
        <div>Approved</div>
        <div>Marks</div>
        <div>Description</div>
        <div>Upload</div>
        <div></div>
      </Table.Header>
      <Table.Body
        data={assessmentData}
        render={(assesment) => (
          <AssesmentRow assesment={assesment} key={assesment.id} />
        )}
      />
    </Table>
  );
}

export default AssessmentTable;
