import { useSelector } from "react-redux";
import Filter from "../../../ui/Filter";

import TableOperations from "../../../ui/TableOperations";

function TeacherAllOperations() {
  const deadline = useSelector((state) => state.student.lastdate);
  const assignedMarks = useSelector((state) => state.student.marks);
  const divisions = useSelector((state) => state.student.allDivTeacher);
  console.log("THESE ARE DIVISIONS", divisions);
  return (
    <>
      <div>Deadline : {deadline}</div>
      <div>Marks : {assignedMarks}</div>
      <div></div>
      <TableOperations>
        <Filter
          filterField="division"
          options={divisions.map((div) => ({
            value: `Div${div}`,
            label: `Div ${div}`,
          }))}
          user="teacher"
        />
      </TableOperations>
    </>
  );
}

export default TeacherAllOperations;
