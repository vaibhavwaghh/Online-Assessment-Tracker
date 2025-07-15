import styled from "styled-components";
import PropTypes from "prop-types";

import HeaderMenu from "../../ui/HeaderMenu";
import UserAvatar from "../../features/authentication/UserAvatar";
import { useStudent } from "../useStudent";
import { updateAllSubjects, updateTotalSubject } from "../../redux/userSlice";
import { useDispatch } from "react-redux";
import Spinner from "../../ui/Spinner";

function HeaderStudent({ currentUserDetails }) {
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
  if (currentUserDetails[0]?.studentName) {
    var {
      currentYear: { currentYear },
      departmentName: { departmentName },
    } = currentUserDetails[0];
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
              <UserAvatar currentUserDetails={currentUserDetails} />
      <HeaderMenu />
    </StyledHeader>
  );
}

HeaderStudent.propTypes = {
  currentUserDetails: PropTypes.array.isRequired,
};

export default HeaderStudent;
