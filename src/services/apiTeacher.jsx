import { fromUnixTime } from "date-fns";
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
  const { teacherId, subjectId } = allIds;
  let query = supabase
    .from("assignments")
    .select(
      "id, created_at,assignmentName,subjectOfAssignment,deadline,assignmentInformation,teacherId(teacherName),description ,assignedMarks"
    )
    .eq("subjectOfAssignment", subjectId)
    .eq("teacherId", teacherId);
  let { data, error } = await query;
  if (error) {
    console.error(error);
    throw new Error("DATA NOT LOADED");
  }

  return data;
}

export async function getAllTeachersAllStudents(divisionNo) {
  /**GET THE  DIVISION ID */
  const { data, error } = await getDivIdFromDivNumber(divisionNo);

  /**GET THE STUDENTS OF THAT DIVISION */
  let query = supabase
    .from("students")
    .select("*")
    .eq("currentDiv", data[0].id)
    .order("rollNo");

  let { data: studentData, error: error1 } = await query;
  if (error || error1) {
    console.error(error);
    throw new Error("DATA NOT LOADED");
  }
  return studentData;
}

export async function getDivIdFromDivNumber(divisionNo) {
  let query = supabase
    .from("division")
    .select("id")
    .eq("currentDivision", divisionNo);
  let { data, errror } = await query;
  return { data, errror };
}

export async function getTeachersDivNumberUsingTeacherId(teacherId) {
  console.log("THIS IS GET TEACHER DIV NUMBER", teacherId);
  const { data, error } = await getTeachersAllDivId(teacherId);
  console.log("THIS IS TEACHER DIV IDS", data);
  if (error) console.error(error);
  const allDiv = [];
  if (data) {
    for (let i = 0; i < data.length; i++) {
      // Assuming you want to loop over the first 3 elements
      const { data: data1, error: error1 } = await getTeachersAllDivisionNumber(
        data[i].divisionId
      );
      allDiv.push(data1);
    }
  }
  return allDiv; // Move the return statement outside the loop
}

export async function getTeachersAllDivId(teacherId) {
  let query2 = supabase
    .from("teacherDivision")
    .select("divisionId")
    .eq("teacherId", teacherId);
  let { data, error } = await query2;
  console.log("DIV DATA IN GET TEACHER", data);
  return { data, error };
}

export async function getTeachersAllDivisionNumber(divisionId) {
  console.log("DIVISION ID WAS CALLED", divisionId);
  let query3 = supabase
    .from("division")
    .select("currentDivision")
    .eq("id", divisionId);

  let { data, error } = await query3;
  if (error) console.log(error);
  return { data, error };
}
