import styled from "styled-components";
import Logout from "../features/authentication/LogOut";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar";
import { useStudent } from "../features/student/useStudent";
import { updateAllSubjects, updateTotalSubject } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import Spinner from "./Spinner";

function HeaderStudent({ curruserDetails }) {
  const StyledHeader = styled.header`
    background-color: var(--color-grey-0);
    padding: 1.2rem 4.8rem;
    border-bottom: 1px solid var(--color-grey-100);

    display: flex;
    gap: 2.4rem;
    align-items: center;
    justify-content: flex-end;
  `;
  const dispatch = useDispatch();
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
  if (data) {
    dispatch(updateTotalSubject(data.length));
    dispatch(updateAllSubjects(data));
  }
  return (
    <StyledHeader>
      <UserAvatar curruserDetails={curruserDetails} />
      <HeaderMenu />
    </StyledHeader>
  );
}

export default HeaderStudent;
