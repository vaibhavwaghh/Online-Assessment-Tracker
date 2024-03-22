import supabase from "./supaBase";

export async function getAssessmentOfSubject(subjectName) {
  try {
    console.log(subjectName);

    /**1) GET SUBJECT ID */
    const { data: subjectId, error1 } = await supabase
      .from("allSubject")
      .select("id")
      .eq("subjectName", subjectName);
    console.log(subjectId[0].id);

    /**GET THE TEACHER NAME */
    const { data: teacherName, error2 } = await supabase
      .from("teacher")
      .select("teacherName")
      .eq("teachingSubject", subjectId[0].id);
    console.log(teacherName[0].teacherName);

    let teacher = teacherName[0]?.teacherName;
    /**2) GET ALL ASSESSMENTS OF SUBJECT */
    let { data: assessmentData, error3 } = await supabase
      .from("assignments")
      .select("assignmentName")
      .eq("subjectOfAssignment", subjectId[0]?.id);

    if (error1 || error2 || error3) {
      console.error(error1 || error2 || error3);
      throw new Error("DATA NOT LOADED");
    }
    console.log(teacher, assessmentData);
    // Return an object containing both teacher name and assessment data
    return { teacher, assessmentData };
  } catch (error) {
    console.error(error);
    throw new Error("DATA NOT LOADED");
  }
}
