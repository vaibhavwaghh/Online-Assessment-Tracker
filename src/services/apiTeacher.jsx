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

export async function getAllAssignmentOfTeacher(allIds) {
  console.log("FROM GETALL ASS TEACHER", allIds);
  const { teacherId, subjectId } = allIds;
  let query = supabase
    .from("assignments")
    .select("*")
    .eq("subjectOfAssignment", subjectId)
    .eq("teacherId", teacherId);
  let { data, error } = await query;
  if (error) {
    console.error(error);
    throw new Error("DATA NOT LOADED");
  }
  return data;
}

export async function getAllTeachersAllStudents(teacherId) {
  /**GET THE TEACHERS DIVISION */
  let query = supabase
    .from("teacher")
    .select("teachingInDiv")
    .eq("id", teacherId);
  let { data, error } = await query;

  let query1 = supabase
    .from("students")
    .select("*")
    .eq("currentDiv", data[0].teachingInDiv)
    .order("rollNo");

  let { data: studentData, error: error1 } = await query1;
  if (error || error1) {
    console.error(error);
    throw new Error("DATA NOT LOADED");
  }
  return studentData;
}
