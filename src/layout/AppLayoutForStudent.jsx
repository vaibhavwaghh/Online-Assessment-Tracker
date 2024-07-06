import { Outlet } from "react-router-dom";
import styled from "styled-components";

import { useDispatch } from "react-redux";
import { useUser } from "../features/authentication/useUser";
import { updatestudentId } from "../redux/userSlice";
import HeaderStudent from "../students/header/HeaderStudent";
function AppLayoutForStudent() {
  console.log("APP LAYOUT STUDENT IS INVOKED");
  const Main = styled.main`
    background-color: var(--color-grey-50);
    padding: 5rem 0rem 5.4rem 2rem;
  `;

  const {
    user: {
      user_metadata: { details },
    },
  } = useUser();
  const dispatch = useDispatch();
  let curruserDetails;
  var { currstudentDetails, studentId } = details;
  curruserDetails = currstudentDetails;
  dispatch(updatestudentId(studentId));
  return (
    <div>
      <HeaderStudent curruserDetails={curruserDetails} />
      <Main>
        <div>
          <Outlet />
        </div>
      </Main>
    </div>
  );
}

export default AppLayoutForStudent;
