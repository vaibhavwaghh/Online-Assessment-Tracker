import { getCurrentDateTime } from "../utils/helpers";
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
      .select("*")
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

export async function submitNewAssessment(data) {
  console.log("DATA IN API", data);
  /**https://sxmbvoflfqxxczzfdyse.supabase.co/storage/v1/object/public/studentUploadedAssignments/VAIBHAV%20PRAKASHWAGH-Introduction%20to%20-certificate%20(1).pdf */

  /**https://sxmbvoflfqxxczzfdyse.supabase.co/storage/v1/object/public/studentUploadedAssignments/0.13665972295438444-Sem%207.pdf */

  /**1) TO UPLOAD THE PDF FILE INTO BUCKET */
  const pdfFileName = `${Math.random()}-${data.name}`.replaceAll("/", "");

  const pdfFilePath = `${
    import.meta.env.VITE_SUPABASE_URL
  }/storage/v1/object/public/studentUploadedAssignments/${pdfFileName}`;

  const { error: storageError } = await supabase.storage
    .from("studentUploadedAssignments")
    .upload(pdfFileName, data);

  /**2) TO STORE THE STUDENT INFO IN UPLOADED FILE DATABASE */
  let dataToBeInserted = {
    solutionPdf: pdfFilePath,
    time: getCurrentDateTime(),
    // subject:,
    // assignmentNo: id,
    // student:
  };
  console.log(dataToBeInserted);
}
