import { useDispatch } from "react-redux";
import { updateSubjectId } from "../redux/userSlice";
import { AiOutlineHome } from "react-icons/ai";
import PropTypes from "prop-types";

function EachSubject({ subject, StyledNavLink }) {
  const { id, subjectName } = subject;
  const dispatch = useDispatch();

  // Function to dispatch subjectId when NavLink is clicked
  const handleClick = () => {
    console.log("THIS SUBJECT WAS CLICKED", id, subjectName);
    dispatch(updateSubjectId(id));
  };

  return (
    <StyledNavLink to={`/assessment/${subjectName}`} onClick={handleClick}>
      <AiOutlineHome />
      <span>{subjectName}</span>
    </StyledNavLink>
  );
}

EachSubject.propTypes = {
  subject: PropTypes.shape({
    id: PropTypes.number.isRequired,
    subjectName: PropTypes.string.isRequired,
  }).isRequired,
  StyledNavLink: PropTypes.elementType.isRequired,
};

export default EachSubject;
