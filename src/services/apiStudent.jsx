import supabase from "./supaBase";

export async function getSubjectOfStudent(
  currentStudentYear,
  currentStudentDepartment
) {
  console.log(currentStudentYear, currentStudentDepartment);

  /**1) GET DEPARTMENT ID */
  const { data: departmentId, error1 } = await supabase
    .from("departments")
    .select("id")
    .eq("departmentName", currentStudentDepartment);
  console.log(departmentId[0].id);

  /**2) GET YEAR-ID */
  const { data: yearId, error2 } = await supabase
    .from("year")
    .select("id")
    .eq("currentYear", currentStudentYear)
    .eq("currentDepartment", departmentId[0].id);
  console.log(yearId);

  if (error1 || error2) {
    console.error(error1);
    throw new Error("NOT LOADED");
  }
  /**3) GET ALL SUBJECTS USING YEAR ID*/
  let data = await getAllSubjectsUsingYearId(yearId[0]?.id);
  return data;
}

export async function getAllSubjectsUsingYearId(id) {
  let { data, error: error3 } = await supabase
    .from("allSubject") // Replace "YourTableNameHere" with the actual name of your table
    .select("*")
    .eq("subjectForYear", id);

  if (error3) {
    console.error(error3);
    throw new Error("NOT LOADED");
  }
  return data;
}

export async function getTeacherIdFromSubjectId(subjectId) {
  let { data, error } = await supabase
    .from("teacher")
    .select("id")
    .eq("teachingSubject", subjectId);
  if (error) throw new Error("DATA NOT LOADED");
  return data;
}
