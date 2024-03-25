import { useSelector } from "react-redux";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function TeacherAllOperations() {
  const deadline = useSelector((state) => state.student.lastdate);
  const assignedMarks = useSelector((state) => state.student.marks);

  return (
    <>
      <div>Deadline : {deadline}</div>
      <div>Marks : {assignedMarks}</div>
      <div></div>
      <TableOperations>
        <Filter
          filterField="division"
          options={[
            { value: "Div 3", label: "Div 3" },
            { value: "Div 4", label: "Div 4" },
            { value: "Div 9", label: "Div 9" },
          ]}
        />
        <SortBy
          filterField="discount"
          options={[
            { value: "rollNo", label: "Sort By Roll No " },
            { value: "status", label: "Sort By Status " },
            { value: "approved", label: "Sort By Approved " },
            // { value: "regularPrice-desc", label: "Sort By Price (high first)" },
            // { value: "maxCapacity-asc", label: "Sort By Capacity (low first)" },
            // {
            //   value: "maxCapacity-desc",
            //   label: "Sort By Capacity (high first)",
            // },
          ]}
        />
      </TableOperations>
    </>
  );
}

export default TeacherAllOperations;
