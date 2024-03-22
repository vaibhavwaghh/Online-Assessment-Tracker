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

  /**3) GET ALL SUBJECTS */
  let { data, error3 } = await supabase
    .from("allSubject") // Replace "YourTableNameHere" with the actual name of your table
    .select(" subjectName")
    .eq("subjectForYear", yearId[0]?.id);

  if (error1 || error2 || error3) {
    console.error(error1);
    throw new Error("DATA NOT LOADED");
  }
  return data;
}
