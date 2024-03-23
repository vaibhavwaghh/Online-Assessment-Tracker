import { useDispatch } from "react-redux";
import supabase from "./supaBase";
import { updatestudentId } from "../redux/userSlice";

export async function login({ email, password }) {
  /**1) FIND THE ID OF THE STUDENT*/
  const { data: studentId, error } = await supabase
    .from("userRole")
    .select(" student  ")
    .eq("emailId", email);
  console.log("THIS IS STUDENTID ", studentId);

  /**2) FIND ALL DETAILS OF STUDENT */
  const { data: currUserDetails, error3 } = await supabase
    .from("students")
    .select(
      "departmentName (departmentName), currentYear(currentYear)  , currentDiv (currentDivision), studentName "
    )
    .eq("id", studentId[0].student);
  console.log("THIS IS STUDENT DETAILS", currUserDetails);

  let allDetails = {
    currUserDetails,
    studentId: studentId[0].student,
  };

  /**3) CHECK WHETHER EMAIL ID AND PASSWORD IS CORRECT */
  const { data: currentUser, error1 } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  /**4) UPDATE THE USER-ROLE OF THE CURRENT USER */
  const { data: currentUser2, error2 } = supabase.auth.updateUser({
    data: {
      details: allDetails,
    },
  });

  // if (error || error1) {
  //   throw new Error(error.message);
  // }
  console.log(currentUser2);
  return currentUser2;
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
