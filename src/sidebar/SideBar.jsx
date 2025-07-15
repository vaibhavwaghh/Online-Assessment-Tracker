import styled from "styled-components";
import MainNav from "../ui/MainNav";
import Logo from "../ui/Logo";
import { useStudent } from "../students/useStudent";
import Spinner from "../ui/Spinner";
import { useDispatch } from "react-redux";
import { updateAllSubjects, updateTotalSubject } from "../redux/userSlice";

import TeacherSideBar from "./TeacherSideBar";
import HodSideBar from "./HodSideBar";
import PrincipalSideBar from "./PrincipalSideBar";
// import Uploader from "../data/Uploader";
function SideBar({ curruserDetails }) {
  const dispatch = useDispatch();
  
  // Extract student data for hook call
  const isStudent = curruserDetails?.[0]?.studentName;
  const currentYear = isStudent ? curruserDetails[0]?.currentYear?.currentYear : null;
  const departmentName = isStudent ? curruserDetails[0]?.departmentName?.departmentName : null;
  
  // Always call the hook at the top level
  const { isLoading: isLoadingStudents, data } = useStudent(
    currentYear,
    departmentName
  );

  const StyledSideBar = styled.aside`
    background-color: var(--color-grey-0);
    /* background-color: green; */
    padding: 3.2rem 2.4rem;
    border-right: 1px solid var(--color-grey-100);
    grid-row: 1/-1;
    display: flex;
    flex-direction: column;
    gap: 3.2rem;
  `;
  
  // Handle different user types
  if (curruserDetails?.principalName) {
    return <PrincipalSideBar principalDetails={curruserDetails} />;
  } else if (curruserDetails[0]?.teacherName) {
    return <TeacherSideBar teacherDetails={curruserDetails[0]} />;
  } else if (curruserDetails[0]?.hodName) {
    return <HodSideBar hodDetails={curruserDetails[0]} />;
  }

  // Handle student case
  if (isStudent) {
    console.log("THIS IS STUDENT SUBJECT DATA", data);
    if (isLoadingStudents) return <Spinner />;
    if (data) {
      dispatch(updateTotalSubject(data.length));
      dispatch(updateAllSubjects(data));
    }
    return (
      <StyledSideBar>
        <Logo />
        <div></div>
        <MainNav data={data} />
      </StyledSideBar>
    );
  }

  // Fallback return
  return (
    <StyledSideBar>
      <Logo />
      <div></div>
      <MainNav data={[]} />
    </StyledSideBar>
  );
}

export default SideBar;
