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

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;+

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;
function MainNav({ data }) {
  return (
    <nav>
      <NavList>
        <div>
          <StyledNavLink to={`/student`}>
            <AiOutlineHome />
            <span>HOME</span>
          </StyledNavLink>
        </div>
        {data?.map((subject) => (
          <li key={subject.id}>
            <EachSubject StyledNavLink={StyledNavLink} subject={subject} />
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
