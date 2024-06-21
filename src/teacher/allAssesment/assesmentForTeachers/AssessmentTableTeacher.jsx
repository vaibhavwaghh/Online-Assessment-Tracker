import Table from "../../../ui/Table";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../../ui/Spinner";
import { useTeacherAllAssignment } from "../../teacherTable/useTeacher";
import AssesmentRowTeacher from "./AssesmentRowTeacher";
import { useGetTeachersAllDivisions } from "../../useTeacherOperation";
import { updateAllDivOfTeacher } from "../../../redux/userSlice";

function AssessmentTableForTeacher() {
  const dispatch = useDispatch();
  const teacherId = useSelector((state) => state.student.teacherId);
  const subjectId = useSelector((state) => state.student.subjectId);
  console.log(
    "THIS IS NEW SUBJECT AND TEACHERID SUBJECTID",

    teacherId,
    subjectId
  );
  const allIds = { teacherId, subjectId };

  /**1) GET ALL ASSIGNMENT OF TEACHER */
  const { isLoading, data } = useTeacherAllAssignment(allIds);

  /**2) GET ALL DIVISIONS OF TEACHER */
  const { data: data1, isLoading: isLoading1 } =
    useGetTeachersAllDivisions(teacherId);
  if (isLoading || isLoading1) return <Spinner />;
  let divArray = [];
  for (let i = 0; i < data1?.length; i++) {
    divArray.push(data1[i][0].currentDivision);
  }

  dispatch(updateAllDivOfTeacher(divArray));

  return (
    <Table columns="1.6fr 1fr 1fr 0.6fr 1.5fr 1fr 1.2fr">
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
          <AssesmentRowTeacher assesment={assesment} key={assesment.id} />
        )}
      />
    </Table>
  );
}

export default AssessmentTableForTeacher;
