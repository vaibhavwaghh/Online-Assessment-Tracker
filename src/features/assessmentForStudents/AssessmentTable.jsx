import { useParams } from "react-router-dom";
import Table from "../../ui/Table";

import AssesmentRow from "./AssesmentRow";
import Spinner from "../../ui/Spinner";
import { useGetAllAssessment } from "./useAssessment";
import { useDispatch } from "react-redux";
import { updatetotalNumberOfAssesment } from "../../redux/userSlice";

function AssessmentTable() {
  const { subjectName } = useParams();
  const dispatch = useDispatch();

  const { assessmentData, isLoading } = useGetAllAssessment(subjectName);
  console.log("THIS IS ASSESMENT DATA LENGTH", assessmentData);
  if (assessmentData) {
    dispatch(updatetotalNumberOfAssesment(assessmentData?.length));
  }
  if (isLoading) return <Spinner />;
  return (
    <Table columns="100px 100px 120px 80px 80px 100px 80px 80px 100px 100px">
      <Table.Header>
        <div>Name</div>
        <div>Teacher</div>
        <div>Assigned PDF</div>
        <div>Deadline</div>
        <div>Status</div>
        <div>Approved</div>
        <div>Marks</div>
        <div>Description</div>
        <div>Submitted PDF</div>
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
