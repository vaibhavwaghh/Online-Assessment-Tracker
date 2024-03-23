import { useDispatch } from "react-redux";
import supabase from "./supaBase";
import { updatestudentId } from "../redux/userSlice";

export async function login({ email, password }) {
  /**1) FIND THE ROLE  OF THE USER*/
  const { data: role, error: error1 } = await supabase
    .from("admin")
    .select("roleOfUser")
    .eq("emailId", email);
  // console.log("THIS IS STUDENT ROLE ", role[0].roleOfUser);

  /**2) FIND THE ID OF USER */
  const { data: userId, error: error2 } = await supabase
    .from("admin")
    .select(role[0].roleOfUser)
    .eq("emailId", email);
  console.log("THIS IS STUDENTID ", userId);
  let allDetails = {};

  if (role[0].roleOfUser === "student") {
    /**3) FIND ALL DETAILS OF STUDENT */
    const { data: currstudentDetails, error: error3 } = await supabase
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
  console.log("BEFORE IF", role[0].roleOfUser);
  if (role[0].roleOfUser === "teacher") {
    console.log("INSIDE IF", role[0].roleOfUser);
    /**3) FIND ALL DETAILS OF TEACHER */
    const { data: currteacherDetails, error: error4 } = await supabase
      .from("teacher")
      .select(
        "teachingInDepartment (departmentName), teachingInYear (currentYear),teachingSubject(id, subjectName)  , teachingInDiv (currentDivision), teacherName"
      )
      .eq("id", userId[0].teacher);
    console.log("THIS IS TEACHER DETAILS", currteacherDetails);

    allDetails = {
      currteacherDetails,
      teacherId: userId[0].teacher,
    };
    console.log("THESE ARE ALL TEACHER DETAILS", allDetails);
  }
  /**3) CHECK WHETHER EMAIL ID AND PASSWORD IS CORRECT */
  const { data: currentUser, error: error4 } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  /**4) UPDATE THE USER-ROLE OF THE CURRENT USER */
  const { data: currentUser2, error: error5 } = supabase.auth.updateUser({
    data: {
      details: allDetails,
    },
  });
  console.log("THIS IS CURRENT USER 1 AND USER 2", currentUser, currentUser2);
  return currentUser;
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
