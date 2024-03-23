import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { AiOutlineHome } from "react-icons/ai";
import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHomeModern,
  HiOutlineUser,
} from "react-icons/hi2";
import EachSubject from "./EachSubject";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

function MainNav({ data }) {
  return (
    <nav>
      <NavList>
        {data?.map((subject) => (
          <li key={subject.id}>
            <EachSubject subject={subject} />
          </li>
        ))}
      </NavList>
    </nav>
  );
}

{
  /* 
 <li>
   <StyledNavLink to="/">
     <AiOutlineHome />
     <span>Admin</span>
   </StyledNavLink>
   <StyledNavLink to="/hod">
     <HiOutlineCalendarDays />
     <span>H.O.D</span>
   </StyledNavLink>
   <StyledNavLink to="/teacher">
     <HiOutlineHomeModern />
     <span>Teacher</span>
   </StyledNavLink>
   <StyledNavLink to="/student">
     <HiOutlineUser />
     <span>Student</span>
   </StyledNavLink>
   <StyledNavLink to="/settings">
     <HiOutlineCog6Tooth />
     <span>Principal</span>
   </StyledNavLink>
 </li>; */
}
export default MainNav;
