import styled from "styled-components";
import MainNav from "../ui/MainNav";
import Logo from "../ui/Logo";
import { useStudent } from "../students/useStudent";
import Spinner from "../ui/Spinner";
import { useDispatch } from "react-redux";
import { updateAllSubjects, updateTotalSubject } from "../redux/userSlice";
import PropTypes from "prop-types";

import TeacherSideBar from "./TeacherSideBar";
import HodSideBar from "./HodSideBar";
import PrincipalSideBar from "./PrincipalSideBar";
// import Uploader from "../data/Uploader";

function SideBar({ currentUserDetails }) {
  const dispatch = useDispatch();
  
  // Extract student data for the hook call
  let currentYear, departmentName;
  if (currentUserDetails[0]?.studentName) {
    const studentData = currentUserDetails[0];
    currentYear = studentData.currentYear?.currentYear;
    departmentName = studentData.departmentName?.departmentName;
  }
  
  // Always call the hook, but pass null values when not a student
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
  
  if (currentUserDetails?.principalName) {
    return <PrincipalSideBar principalDetails={currentUserDetails} />;
  } else if (currentUserDetails[0]?.teacherName) {
    return <TeacherSideBar teacherDetails={currentUserDetails[0]} />;
  } else if (currentUserDetails[0]?.hodName) {
    return <HodSideBar hodDetails={currentUserDetails[0]} />;
  }

  // Handle student case
  if (currentUserDetails[0]?.studentName) {
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

  // Default return for other cases
  return (
    <StyledSideBar>
      <Logo />
      <div></div>
      <MainNav data={[]} />
    </StyledSideBar>
  );
}

SideBar.propTypes = {
  currentUserDetails: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]).isRequired,
};

export default SideBar;
