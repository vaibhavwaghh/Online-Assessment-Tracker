import { useDispatch } from "react-redux";
import Table from "../../ui/Table";
import Spinner from "../../ui/Spinner";
import { useTeacherAllAssignment } from "../../teacher/teacherTable/useTeacher";
import { useGetTeachersAllDivisions } from "../../teacher/useTeacherOperation";
import { updateAllDivOfTeacher } from "../../redux/userSlice";
import AssessmentRowHod from "./AssessmentRowForHod";
import PropTypes from "prop-types";

function AssessmentTableForHod({ teacherId, subjectId, isPrincipal }) {
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
    <Table columns="1.5fr 1fr 1fr 1fr 1fr 1.5fr 1fr 1fr">
      <Table.Header>
        <div>Name</div>
        <div>Teacher</div>
        <div>Created</div>
        <div>Deadline</div>
        <div>Marks</div>
        <div>Description</div>
        <div> PDF</div>
        <div>Student Details</div>
      </Table.Header>
      <Table.Body
        data={data}
        render={(assessment) => (
          <AssessmentRowHod
            assessment={assessment}
            key={assessment.id}
            isPrincipal={isPrincipal}
          />
        )}
      />
    </Table>
  );
}

AssessmentTableForHod.propTypes = {
  teacherId: PropTypes.number.isRequired,
  subjectId: PropTypes.number.isRequired,
  isPrincipal: PropTypes.number,
};

export default AssessmentTableForHod;
