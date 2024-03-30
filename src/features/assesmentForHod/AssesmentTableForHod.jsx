import { useParams, useSearchParams } from "react-router-dom";
import Table from "../../ui/Table";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../ui/Spinner";
import { useTeacherAllAssignment } from "../teacher/useTeacher";

import { useGetTeachersAllDivisions } from "../operations/useTeacherOperation";
import { updateAllDivOfTeacher } from "../../redux/userSlice";
import AssesmentRowHod from "./AssesmentRowForHod";

function AssessmentTableForHod({ teacherId, subjectId }) {
  const dispatch = useDispatch();

  const allIds = { teacherId, subjectId };

  /**1) GET ALL ASSIGNMENT OF TEACHER */

  const { isLoading, data } = useTeacherAllAssignment(allIds);
  /**2) GET ALL DIVISIONS OF TEACHER */
  const { data: data1, isLoading: isLoading1 } =
    useGetTeachersAllDivisions(teacherId);
  let divArray = [];
  for (let i = 0; i < data1?.length; i++) {
    divArray.push(data1[i][0].currentDivision);
  }
  if (isLoading || isLoading1) return <Spinner />;
  console.log("THIS IS DIV ARRAY", divArray);
  dispatch(updateAllDivOfTeacher(divArray));

  return (
    <Table columns="150px 200px 150px 100px 100px 150px 200px">
      <Table.Header>
        <div>Name</div>
        <div>Created</div>
        <div>Deadline</div>
        <div>Marks</div>
        <div>Description</div>
        <div>Assignment PDF</div>
        <div>Student Details</div>
      </Table.Header>
      <Table.Body
        data={data}
        render={(assesment) => (
          <AssesmentRowHod assesment={assesment} key={assesment.id} />
        )}
      />
    </Table>
  );
}

export default AssessmentTableForHod;
