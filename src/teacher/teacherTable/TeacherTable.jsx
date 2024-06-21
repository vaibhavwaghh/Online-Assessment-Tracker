import { useSelector } from "react-redux";
import Table from "../../ui/Table";
import { useGetTeachersAllStudents } from "./useTeacher";
import Spinner from "../../ui/Spinner";

import { useSearchParams } from "react-router-dom";
import TeacherMiddleWare from "./TeacherMiddleWare";

function TeacherTable({ isTeacher = 1 }) {
  const [searchParams] = useSearchParams();

  const teacherId = useSelector((state) => state.student.teacherId);
  console.log("this is teacher id", teacherId);

  const divisions = useSelector((state) => state.student.allDivTeacher);
  let divNo;
  if (searchParams?.get("division")) {
    divNo = searchParams?.get("division")[3];
  }
  const currYear = useSelector((state) => state.student.currYearId);
  console.log("THIS IS CURR YEAR ID", currYear);
  const { isLoading, data: studentData } = useGetTeachersAllStudents(
    divNo || divisions[0],
    currYear
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
