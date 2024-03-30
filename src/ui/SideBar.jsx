import styled from "styled-components";
import MainNav from "./MainNav";
import Logo from "./Logo";
import { useStudent } from "../features/student/useStudent";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useDispatch } from "react-redux";
import { updatestudentId } from "../redux/userSlice";
import { AiOutlineHome } from "react-icons/ai";
import TeacherSideBar from "./TeacherSideBar";
import HodSideBar from "./HodSideBar";
import PrincipalSideBar from "./PrincipalSideBar";
// import Uploader from "../data/Uploader";
function SideBar({ curruserDetails }) {
  const NavList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  `;
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

  if (curruserDetails.principalName) {
    return <PrincipalSideBar principalDetails={curruserDetails} />;
  } else if (curruserDetails[0]?.teacherName) {
    return <TeacherSideBar teacherDetails={curruserDetails[0]} />;
  } else if (curruserDetails[0]?.hodName) {
    return <HodSideBar hodDetails={curruserDetails[0]} />;
  }

  if (curruserDetails[0]?.studentName) {
    var {
      currentYear: { currentYear },
      departmentName: { departmentName },
    } = curruserDetails[0];
  }
  const { isLoading: isLoadingStudents, data } = useStudent(
    currentYear,
    departmentName
  );
  console.log("THIS IS STUDENT SUBJECT DATA", data);
  if (isLoadingStudents) return <Spinner />;
  return (
    <StyledSideBar>
      <Logo />
      <div></div>
      <MainNav data={data} />
      {/* <Uploader /> */}
    </StyledSideBar>
  );
}

export default SideBar;
