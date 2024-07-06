import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "../ui/Header";
import SideBar from "../sidebar/SideBar";
import { useDispatch } from "react-redux";
import { useUser } from "../features/authentication/useUser";
import { updateYearId, updateteacherId } from "../redux/userSlice";

function AppLayoutForTeacher() {
  console.log("APP LAYOUT TEACHER IS INVOKED");
  const StyledAppLayout = styled.div`
    display: grid;
    height: 100vh;
    grid-template-columns: 23rem 1fr;
    grid-template-rows: auto 1fr;
  `;
  const Main = styled.main`
    background-color: var(--color-grey-50);
    padding: 5rem 0rem 5.4rem 2rem;
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
  var { currteacherDetails, teacherId } = details;
  curruserDetails = currteacherDetails;
  dispatch(updateYearId(curruserDetails[0]?.teachingInYear.id));
  dispatch(updateteacherId(teacherId));
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

export default AppLayoutForTeacher;
