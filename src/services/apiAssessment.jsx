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
        "assignmentInformation , assignmentName , deadline ,id , subjectOfAssignment , teacherId(teacherName) , description,assignedMarks"
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
  const { subjectId, studentId, asssignmentId: assignmentId } = allIds;

  console.log(
    "THIS IS STUDENT SUBJECT TEACHER FROM API",
    subjectId,
    assignmentId,
    studentId
  );

  try {
    const { data: submittedData, error } = await supabase
      .from("submittedAssignment")
      .select(
        "studentId , approved , created_at , solutionPdf , status , submittedMarks"
      )
      .eq("subjectId", subjectId)
      .eq("studentId", studentId)
      .eq("assignmentId", assignmentId);

    // console.log("STATUS OF THIS ASS", status);

    if (error) {
      console.error(error);
      return false;
    }

    return submittedData ? submittedData[0] : {};
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

export async function updateCurrentAssignment(updatedData) {
  const { data, allIds } = updatedData;
  const { subjectId, assignmentId, studentId } = allIds;
  console.log("DATA AND ID", data, allIds);
  let query = supabase
    .from("submittedAssignment")
    .update({ ...data })
    .eq("subjectId", subjectId)
    .eq("studentId", studentId)
    .eq("assignmentId", assignmentId)
    .select("*");

  const { data: updated, error } = await query;
  console.log(updated);
  if (error) console.log(error);
  return updated;
  // .eq("teacherId", teacherId);
}
