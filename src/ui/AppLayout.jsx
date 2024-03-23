import { Outlet } from "react-router-dom";
// import Header from "./Header";
// import SideBar from "./SideBar";
import styled from "styled-components";
import Header from "./Header";
import SideBar from "./SideBar";
import { useDispatch } from "react-redux";
import { useUser } from "../features/authentication/useUser";
import { updatestudentId, updateteacherId } from "../redux/userSlice";
// import Logout from "../features/authentication/Logout";
function AppLayout() {
  const StyledAppLayout = styled.div`
    display: grid;
    height: 100vh;
    grid-template-columns: 26rem 1fr;
    grid-template-rows: auto 1fr;
  `;
  const Main = styled.main`
    background-color: var(--color-grey-50);
    padding: 4rem 4.8rem 6.4rem;
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

  if (details?.studentId) {
    var { currstudentDetails, studentId } = details;
    dispatch(updatestudentId(studentId));
  }
  if (details?.teacherId) {
    var { currteacherDetails, teacherId } = details;
    dispatch(updateteacherId(teacherId));
  }

  return (
    <>
      <StyledAppLayout>
        <Header
          curruserDetails={studentId ? currstudentDetails : currteacherDetails}
        />

        <SideBar
          curruserDetails={studentId ? currstudentDetails : currteacherDetails}
        />
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
