import { useDispatch } from "react-redux";
import { updateSubjectId } from "../redux/userSlice";
import { AiOutlineHome } from "react-icons/ai";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

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

function EachSubject({ subject }) {
  const { id, subjectName } = subject;
  const dispatch = useDispatch();

  // Function to dispatch subjectId when NavLink is clicked
  const handleClick = () => {
    console.log("THIS SUBJECT WAS CLICKED", id, subjectName);
    dispatch(updateSubjectId(id));
  };

  return (
    <>
      <div onClick={handleClick}>
        <StyledNavLink to={`/assessment/${subjectName}`}>
          <AiOutlineHome />
          <span>{subjectName}</span>
        </StyledNavLink>
      </div>
    </>
  );
}

export default EachSubject;
