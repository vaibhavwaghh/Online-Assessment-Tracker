// import { AiOutlineHome } from "react-icons/ai";
import Logo from "./Logo";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useHod } from "../features/hod/useHod";
import Spinner from "./Spinner";
import { AiOutlineHome } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { updateHodId, updateYearId } from "../redux/userSlice";

function PrincipalSideBar({ principalDetails }) {
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
  const NavList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  `;
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
  console.log("principal DETAILS", principalDetails);
  const dispatch = useDispatch();
  let allDepartments = principalDetails?.currPrincipalDepartments;
  // if (isLoading) return <Spinner />;
  // console.log("DATA RECIEVED FROM HOD ALL YEAR", data);
  function handleClick(departmentId) {
    dispatch(updateHodId(departmentId));
  }
  return (
    <StyledSideBar>
      <Logo />

      <nav>
        <NavList>
          <li>
            {allDepartments.map((department) => (
              <>
                <div onClick={() => handleClick(department.id)}>
                  <StyledNavLink to={`/principal/${department.departmentName}`}>
                    <AiOutlineHome />
                    <span>{department.departmentName}</span>
                  </StyledNavLink>
                </div>
              </>
            ))}
          </li>
        </NavList>
      </nav>
    </StyledSideBar>
  );
}

export default PrincipalSideBar;
