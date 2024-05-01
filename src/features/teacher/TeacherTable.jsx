import { useDispatch, useSelector } from "react-redux";
import Table from "../../ui/Table";
import { useGetTeachersAllStudents } from "./useTeacher";
import Spinner from "../../ui/Spinner";
import TeacherRow from "./TeacherRow";
import { useSearchParams } from "react-router-dom";
import TeacherMiddleWare from "./TeacherMiddleWare";
import { useGetStatusOfAsssessment } from "../assessmentForStudents/useAssessment";
import { useEffect, useState } from "react";
import { useGetTeachersAllDivisions } from "../operations/useTeacherOperation";
import { updateAllDivOfTeacher } from "../../redux/userSlice";
import ExportButton from "../operations/ExportButton";

function TeacherTable({ isTeacher = 1 }) {
  const [searchParams] = useSearchParams();

  const teacherId = useSelector((state) => state.student.teacherId);
  console.log("this is teacher id", teacherId);

  const divisions = useSelector((state) => state.student.allDivTeacher);
  let divNo;
  if (searchParams?.get("division")) {
    divNo = searchParams?.get("division")[3];
  }

  const { isLoading, data: studentData } = useGetTeachersAllStudents(
    divNo || divisions[0]
  );

  const allStudentDivMark = useSelector(
    (state) => state.student.allStudentOfDivData
  );
  let columns;
  if (isTeacher) {
    columns = "1fr 1fr 1.5fr 1fr 1fr 1fr 1.5fr 1.5fr";
  } else {
    columns = "1fr 1fr 1.5fr 1fr 1fr 1fr 1.5fr ";
  }
  let i = 0;
  let arr1 = [];
  if (isLoading) return <Spinner />;
  return (
    <>
      <Table columns={columns}>
        {/* <Table.Header>
          <div>Roll no</div>
          <div>Name</div>
          <div>Submission date</div>
          <div>Status</div>
          <div>Approved</div>
          <div>Marks</div>
          <div>STUDENTS PDF</div>
          {isTeacher ? <div>Update Marks</div> : ""}
        </Table.Header> */}
        <Table.Body
          data={studentData}
          render={(student, index) => (
            <TeacherMiddleWare
              isTeacher={isTeacher}
              student={student}
              key={index}
              arr1={arr1}
              i={index}
            />
          )}
        />
      </Table>
    </>
  );
}

export default TeacherTable;
