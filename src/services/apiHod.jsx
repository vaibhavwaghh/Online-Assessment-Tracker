import supabase from "./supaBase";

export async function getHod() {
  console.log("VAIBHAV IS STUDENT");
  let query1 = supabase
    .from("departments")
    .select(" id , departmentName,hodName");
  let { data: hod, error } = await query1;
  if (error) {
    console.error(error);
    throw new Error("DATA NOT LOADED");
  }
  let yearForEachDepartment = {}; // Initialize an empty object to store the data

  for (let i = 0; i < hod.length; i++) {
    const year = await getyearOfEachDepartment(hod[i].id);

    yearForEachDepartment[hod[i].id] = year;
  }

  return { hod, yearForEachDepartment };
}

export async function getyearOfEachDepartment(allYearsOfDepartment) {
  let query = supabase
    .from("year") // Replace "YourTableNameHere" with the actual name of your table
    .select("id , currentYear ,currentDepartment(departmentName) ")
    .eq("currentDepartment", allYearsOfDepartment);
  let { data, error } = await query;
  if (error) {
    console.error(error);
    throw new Error("DATA NOT LOADED");
  }
  return data;
}
