import styled from "styled-components";
import PropTypes from "prop-types";

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;

  color: var(--color-grey-600);
`;

const Avatar = styled.img`
  display: block;
  width: 4rem;
  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;
function UserAvatar({ currentUserDetails }) {
  let username = "";
  if (currentUserDetails) {
    if (currentUserDetails[0]?.studentName) {
      username = currentUserDetails[0]?.studentName;
    }
    if (currentUserDetails[0]?.teacherName) {
      username = currentUserDetails[0]?.teacherName;
    }
    if (currentUserDetails[0]?.hodName) {
      username = currentUserDetails[0]?.hodName;
    }
    if (currentUserDetails?.principalName) {
      username = currentUserDetails?.principalName;
    }
  }
  return (
    <StyledUserAvatar>
      <Avatar src={"default-user.jpg"} alt={`Avatar of Vaibhav`} />
      <span>{username}</span>
    </StyledUserAvatar>
  );
}

UserAvatar.propTypes = {
  currentUserDetails: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]).isRequired,
};

export default UserAvatar;
