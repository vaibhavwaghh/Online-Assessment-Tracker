import supabase from "./supaBase";

export async function getStudent() {
  console.log("VAIBHAV IS STUDENT");
  let query1 = supabase
    .from("students")
    .select(
      " id , departmentName(departmentName) ,currentYear  , currentDiv(currentDivision),studentName "
    );
  let { data: students, error } = await query1;
  if (error) {
    console.error(error);
    throw new Error("DATA NOT LOADED");
  }
  let subjects = {}; // Initialize an empty object to store the data

  for (let i = 0; i < students.length; i++) {
    const subject = await getSubjectOfEachStudent(students[i].currentYear);

    subjects[students[i].currentYear] = subject;
  }

  return { subjects, students };
}

export async function getSubjectOfEachStudent(currentYearOfStudent) {
  let query = supabase
    .from("allSubject") // Replace "YourTableNameHere" with the actual name of your table
    .select("id , subjectName ,subjectForYear(currentYear) ")
    .eq("subjectForYear", currentYearOfStudent);
  let { data, error } = await query;
  if (error) {
    console.error(error);
    throw new Error("DATA NOT LOADED");
  }
  return data;
}
