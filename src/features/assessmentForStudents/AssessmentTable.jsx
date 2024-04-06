import { useParams } from "react-router-dom";
import Table from "../../ui/Table";

import AssesmentRow from "./AssesmentRow";
import Spinner from "../../ui/Spinner";
import { useGetAllAssessment } from "./useAssessment";
import { useDispatch, useSelector } from "react-redux";
import {
  updatetotalNumberOfAssesment,
  updatetotalNumberOfSubmitted,
} from "../../redux/userSlice";

function AssessmentTable() {
  const { subjectName } = useParams();
  const dispatch = useDispatch();

  console.log("table is called");
  // dispatch(updatetotalNumberOfSubmitted(0));

  const numberOfSubmitted = useSelector(
    (state) => state.student.totalNumberOfSubmitted
  );
  const { assessmentData, isLoading } = useGetAllAssessment(subjectName);
  console.log("THIS IS ASSESMENT DATA LENGTH", assessmentData);
  if (assessmentData) {
    dispatch(updatetotalNumberOfAssesment(assessmentData?.length));
  }
  if (isLoading) return <Spinner />;

  console.log("THIS IS NUMBER OF SUBMITTED from selector", numberOfSubmitted);
  return (
    <Table columns="1fr 1fr 1fr 1fr 1fr 1fr  3rem">
      <Table.Header>
        <div>Name</div>
        <div>Teacher</div>
        <div>Assigned PDF</div>
        <div>Deadline</div>
        <div>Status</div>
        <div>Approved</div>
        {/* <div>Marks</div> */}
        <div></div>
        {/* <div>Description</div>
        <div>Submitted PDF</div>
        <div>Upload</div> */}
        {/* <div>detailss   </div> */}
      </Table.Header>
      <Table.Body
        data={assessmentData}
        render={(assesment) => (
          <AssesmentRow
            numberOfSubmitted={numberOfSubmitted}
            assesment={assesment}
            key={assesment.id}
          />
        )}
      />
    </Table>
  );
}

export default AssessmentTable;
