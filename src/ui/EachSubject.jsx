import { useDispatch } from "react-redux";
import { updateSubjectId } from "../redux/userSlice";
import { AiOutlineHome } from "react-icons/ai";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

function EachSubject({ subject, StyledNavLink }) {
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
