import styled from "styled-components";

import ButtonIcon from "./ButtonIcon";
import { HiOutlineUser } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

import Logout from "../features/authentication/LogOut";
import DarkModeToggle from "./DarkModeToggle";

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`;
function HeaderMenu() {
  const navigate = useNavigate();
  const handleNavigation = () => {
    const currentPath = window.location.pathname;
    let newPath;

    if (currentPath.includes("student")) {
      newPath = "student/account";
    } else if (currentPath.includes("teacher")) {
      newPath = "teacher/account";
    } else if (currentPath.includes("hod")) {
      newPath = "hod/account";
    } else if (currentPath.includes("principal")) {
      newPath = "principal/account";
    }
    console.log("THIS IS NEW PATH", newPath, currentPath);
    if (newPath) {
      navigate(`/${newPath}`);
    } else {
      console.error("Unhandled path:", currentPath);
    }
  };
  return (
    <StyledHeaderMenu>
      <li>
        <ButtonIcon onClick={handleNavigation}>
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li>
        <DarkModeToggle />
      </li>
      <li>
        <Logout />
      </li>
    </StyledHeaderMenu>
  );
}

export default HeaderMenu;
