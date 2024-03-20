import supabase from "./supaBase";

export async function getTeacher() {
  console.log("VAIBHAV IS Teacher");
  let query1 = supabase
    .from("teacher")
    .select(
      " id , teachingInDepartment(departmentName) ,teachingInYear(currentYear)  , teachingInDiv(currentDivision),teachingSubject,teacherName "
    );
  let { data: teacherDetails, error } = await query1;
  if (error) {
    console.error(error);
    throw new Error("DATA NOT LOADED");
  }
  let assignments = {}; // Initialize an empty object to store the data

  for (let i = 0; i < teacherDetails.length; i++) {
    const subject = await getAssignmentOfEachStudent(
      teacherDetails[i].teachingSubject
    );

    assignments[teacherDetails[i].teachingSubject] = subject;
  }

  return { teacherDetails, assignments };
}

export async function getAssignmentOfEachStudent(currentAssignmentOfSubject) {
  let query = supabase
    .from("assignments") // Replace "YourTableNameHere" with the actual name of your table
    .select("id , assignmentName ,subjectOfAssignment(subjectName) ")
    .eq("subjectOfAssignment", currentAssignmentOfSubject);
  let { data, error } = await query;
  if (error) {
    console.error(error);
    throw new Error("DATA NOT LOADED");
  }
  return data;
}
