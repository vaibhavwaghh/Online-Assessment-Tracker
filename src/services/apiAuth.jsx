import { useDispatch } from "react-redux";
import supabase from "./supaBase";
import { updatestudentId } from "../redux/userSlice";

export async function loginApi({ email, password }) {
  /**1) CHECK WHETHER EMAIL ID AND PASSWORD IS CORRECT */
  var { data: currentUser, error: error7 } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  /**2) FIND THE ROLE  OF THE USER*/
  var { data: role, error: error1 } = await supabase
    .from("admin")
    .select("roleOfUser")
    .eq("emailId", email);

  /**2) FIND THE ID OF USER */
  var { data: userId, error: error2 } = await supabase
    .from("admin")
    .select(role[0].roleOfUser)
    .eq("emailId", email);

  let allDetails = {};

  if (role[0].roleOfUser === "student") {
    /**3) FIND ALL DETAILS OF STUDENT */
    var { data: currstudentDetails, error: error3 } = await supabase
      .from("students")
      .select(
        "departmentName (departmentName), currentYear(currentYear)  , currentDiv (currentDivision), studentName "
      )
      .eq("id", userId[0].student);
    console.log("THIS IS STUDENT DETAILS", currstudentDetails);

    allDetails = {
      currstudentDetails,
      studentId: userId[0].student,
    };
  }

  /**3) FIND ALL DETAILS OF TEACHER */
  if (role[0].roleOfUser === "teacher") {
    console.log("INSIDE IF", role[0].roleOfUser);
    var { data: currteacherDetails, error: error4 } = await supabase
      .from("teacher")
      .select(
        "teachingInDepartment (departmentName), teachingInYear (id,currentYear),teachingSubject(id, subjectName) , teacherName"
      )
      .eq("id", userId[0].teacher);

    allDetails = {
      currteacherDetails,
      teacherId: userId[0].teacher,
    };
  }

  /**4) FIND ALL DETAILS OF HOD */
  if (role[0].roleOfUser === "hod") {
    console.log("INSIDE IF", role[0].roleOfUser);
    var { data: currhodDetails, error: error4 } = await supabase
      .from("Hod")
      .select("*")
      .eq("id", userId[0].hod);

    allDetails = {
      currhodDetails,
      hodId: userId[0].hod,
    };
  }

  /**5) FIND ALL DETAILS OF PRINCIPAL */
  if (role[0].roleOfUser === "principal") {
    var { data: currPrincipalName, error: error5 } = await supabase
      .from("principal")
      .select("principalName")
      .eq("id", userId[0].principal);

    var { data: currPrincipalDepartments, error: error6 } = await supabase
      .from("Hod")
      .select("*")
      .eq("principalId", userId[0].principal);

    allDetails = {
      currPrincipalDepartments,
      principalId: userId[0].principal,
      principalName: currPrincipalName[0].principalName,
    };
  }

  /**4) UPDATE THE USER-ROLE OF THE CURRENT USER */
  var { data: currentUser2, error: error8 } = supabase.auth.updateUser({
    data: {
      details: allDetails,
    },
  });
  console.log("THIS IS CURRENT USER 1 AND USER 2", currentUser, currentUser2);

  if (
    error1 ||
    error2 ||
    error3 ||
    error4 ||
    error5 ||
    error6 ||
    error7 ||
    error8
  ) {
    throw new Error("THERE IS AN ERROR");
  } else {
    return currentUser;
  }
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;
  const { data, error } = await supabase.auth.getUser();
  console.log(data);

  if (error) {
    throw new Error(error.message);
  }
  return data?.user;
}

export async function logOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
}
