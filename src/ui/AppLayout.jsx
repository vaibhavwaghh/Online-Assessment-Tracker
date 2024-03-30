import { Outlet } from "react-router-dom";
// import Header from "./Header";
// import SideBar from "./SideBar";
import styled from "styled-components";
import Header from "./Header";
import SideBar from "./SideBar";
import { useDispatch } from "react-redux";
import { useUser } from "../features/authentication/useUser";
import {
  updateHodId,
  updatePrincipalId,
  updatestudentId,
  updateteacherId,
} from "../redux/userSlice";
// import Logout from "../features/authentication/Logout";
function AppLayout() {
  const StyledAppLayout = styled.div`
    display: grid;
    height: 100vh;
    grid-template-columns: 23rem 1fr;
    grid-template-rows: auto 1fr;
  `;
  const Main = styled.main`
    background-color: var(--color-grey-50);
    padding: 5rem 0rem 5.4rem 2rem;
    overflow: scroll;
  `;

  const Container = styled.div`
    max-width: 120rem;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 3.2rem;
  `;
  const {
    user: {
      user_metadata: { details },
    },
  } = useUser();
  const dispatch = useDispatch();
  let curruserDetails;
  if (details?.studentId) {
    var { currstudentDetails, studentId } = details;
    curruserDetails = currstudentDetails;
    dispatch(updatestudentId(studentId));
  } else if (details?.teacherId) {
    var { currteacherDetails, teacherId } = details;
    curruserDetails = currteacherDetails;
    dispatch(updateteacherId(teacherId));
  } else if (details?.hodId) {
    var { currhodDetails, hodId } = details;
    curruserDetails = currhodDetails;
    dispatch(updateHodId(hodId));
  } else if (details?.principalId) {
    var { currPrincipalDepartments, principalId, principalName } = details;
    curruserDetails = { currPrincipalDepartments, principalName };
    dispatch(updatePrincipalId(principalId));
  }
  return (
    <>
      <StyledAppLayout>
        <Header curruserDetails={curruserDetails} />

        <SideBar curruserDetails={curruserDetails} />
        <Main>
          <Container>
            <Outlet />
          </Container>
        </Main>
      </StyledAppLayout>
    </>
  );
}

export default AppLayout;
