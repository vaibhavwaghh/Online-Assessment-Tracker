import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";
import { useGetTeachersAllDivisions } from "./useTeacherOperation";
import Spinner from "../../ui/Spinner";
import { updateAllDivOfTeacher } from "../../redux/userSlice";

function TeacherAllOperations() {
  const deadline = useSelector((state) => state.student.lastdate);
  const assignedMarks = useSelector((state) => state.student.marks);
  const divisions = useSelector((state) => state.student.allDivTeacher);
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
            label: `Div ${div}`, // Assuming your divArray elements have the format "divX"
          }))}
        />
        <SortBy
          filterField="discount"
          options={[
            { value: "rollNo", label: "Sort By Roll No " },
            { value: "status", label: "Sort By Status " },
            { value: "approved", label: "Sort By Approved " },
          ]}
        />
      </TableOperations>
    </>
  );
}

export default TeacherAllOperations;
