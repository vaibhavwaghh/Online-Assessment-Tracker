import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";
import { useGetTeachersAllDivisions } from "./useTeacherOperation";
import Spinner from "../../ui/Spinner";

function TeacherAllOperations() {
  const deadline = useSelector((state) => state.student.lastdate);
  const assignedMarks = useSelector((state) => state.student.marks);
  const teacherId = useSelector((state) => state.student.teacherId);
  const { data, isLoading } = useGetTeachersAllDivisions(teacherId);
  let divArray = [];
  if (isLoading) return <Spinner />;
  for (let i = 0; i < data.length; i++) {
    divArray.push(data[i][0].currentDivision);
  }
  console.log("INSIDE TEACHER TABLE OPERATION", data);
  return (
    <>
      <div>Deadline : {deadline}</div>
      <div>Marks : {assignedMarks}</div>
      <div></div>
      <TableOperations>
        <Filter
          filterField="division"
          options={divArray.map((div) => ({
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
