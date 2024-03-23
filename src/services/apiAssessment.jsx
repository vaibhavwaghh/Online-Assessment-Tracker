import supabase from "./supaBase";

export async function getAssessmentOfSubject(subjectName) {
  try {
    console.log(subjectName);

    /**1) GET SUBJECT ID */
    const { data: subjectId, error1 } = await supabase
      .from("allSubject")
      .select("id")
      .eq("subjectName", subjectName);

    /**2) GET ALL ASSESSMENTS OF SUBJECT ALONG WITH TEACHERNAME*/
    let { data: assessmentData, error3 } = await supabase
      .from("assignments")
      .select(
        "assignmentInformation , assignmentName , deadline ,id , subjectOfAssignment , teacherId(teacherName)"
      )
      .eq("subjectOfAssignment", subjectId[0]?.id);

    if (error1 || error3) {
      console.error(error1 || error3);
      throw new Error("DATA NOT LOADED");
    }

    // Return an object containing both teacher name and assessment data
    return assessmentData;
  } catch (error) {
    console.error(error);
    throw new Error("DATA NOT LOADED");
  }
}

export async function submitNewAssessment(data) {
  let { file, subjectId, studentId, asssignmentId: assignmentId } = data;
  console.log("DATA IN API", data);
  /**https://sxmbvoflfqxxczzfdyse.supabase.co/storage/v1/object/public/studentUploadedAssignments/VAIBHAV%20PRAKASHWAGH-Introduction%20to%20-certificate%20(1).pdf */

  /**https://sxmbvoflfqxxczzfdyse.supabase.co/storage/v1/object/public/studentUploadedAssignments/0.13665972295438444-Sem%207.pdf */

  /**1) TO UPLOAD THE PDF FILE INTO BUCKET */
  const pdfFileName = `${Math.random()}-${file.name}`.replaceAll("/", "");

  const pdfFilePath = `${
    import.meta.env.VITE_SUPABASE_URL
  }/storage/v1/object/public/studentUploadedAssignments/${pdfFileName}`;

  const { error: storageError } = await supabase.storage
    .from("studentUploadedAssignments")
    .upload(pdfFileName, file);

  /**2) TO STORE THE STUDENT INFO IN UPLOADED FILE DATABASE */
  let dataToBeInserted = {
    solutionPdf: pdfFilePath,
    assignmentId,
    subjectId,
    studentId,
    status: true,
  };
  console.log(dataToBeInserted);

  /**3) Insert data into submitted assignment */
  const { data: data1, error } = await supabase
    .from("submittedAssignment")
    .insert([dataToBeInserted]);

  console.log(data1);
  console.error(error);
}

export async function getStatusOfCurrentAssignment(allIds) {
  console.log(allIds);
  const { subjectId, studentId, asssignmentId: assignmentId } = allIds;
  console.log("THIS IS STUDENT ID", studentId);

  try {
    const { data: status, error } = await supabase
      .from("submittedAssignment")
      .select("status")
      .eq("studentId", studentId)
      .eq("assignmentId", assignmentId)
      .eq("subjectId", subjectId);

    console.log("STATUS OF THIS ASS", status);

    if (error) {
      console.error(error);
      return false;
    }

    return status ? status[0]?.status : false;
  } catch (error) {
    console.error("Error fetching status:", error);
    return false;
  }
}

export async function createNewAssignment(newAssignment) {
  console.log("THIS IS NEW ASSIGNMENT", newAssignment);
  const { assignmentInformation: file } = newAssignment;
  const pdfFileName = `${Math.random()}-${file.name}`.replaceAll("/", "");

  const pdfFilePath = `${
    import.meta.env.VITE_SUPABASE_URL
  }/storage/v1/object/public/studentUploadedAssignments/${pdfFileName}`;

  const { error: storageError } = await supabase.storage
    .from("studentUploadedAssignments")
    .upload(pdfFileName, file);

  /**2) Insert data into submitted assignment */
  const { data: data1, error } = await supabase
    .from("assignments")
    .insert([{ ...newAssignment, assignmentInformation: pdfFilePath }]);

  console.log(data1);
  console.error(error);
}
