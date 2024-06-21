import supabase from "./supaBase";

export async function getHod(id) {
  let query1 = supabase.from("year").select("*").eq("currentDepartment", id);
  let { data, error } = await query1;
  if (error) {
    console.error(error);
    throw new Error("DATA NOT LOADED");
  }
  return data;
}

export async function getyearOfEachDepartment(allYearsOfDepartment) {
  let query = supabase
    .from("year")
    .select("id , currentYear ,currentDepartment(departmentName) ")
    .eq("currentDepartment", allYearsOfDepartment);
  let { data, error } = await query;
  if (error) {
    console.error(error);
    throw new Error("DATA NOT LOADED");
  }
  return data;
}
