import styled from "styled-components";
import MainNav from "./MainNav";
import Logo from "./Logo";
import { useStudent } from "../features/student/useStudent";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
// import Uploader from "../data/Uploader";
function SideBar() {
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
  const {
    user: {
      email,
      user_metadata: { details },
    },
  } = useUser();
  const {
    currentYear: { currentYear },
    departmentName: { departmentName },
  } = details[0];
  const { isLoading: isLoadingStudents, data } = useStudent(
    currentYear,
    departmentName
  );
  console.log(data);
  if (isLoadingStudents) return <Spinner />;
  return (
    <StyledSideBar>
      <Logo />

      <MainNav data={data} />
      {/* <Uploader /> */}
    </StyledSideBar>
  );
}

export default SideBar;
