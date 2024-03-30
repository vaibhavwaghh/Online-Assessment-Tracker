import styled from "styled-components";
import { useUser } from "./useUser";
// import { useUser } from "./useUser";

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
function UserAvatar({ curruserDetails }) {
  console.log("THIS IS CURRENT USER DETAILS", curruserDetails);
  let username;
  if (curruserDetails[0]?.studentName) {
    username = curruserDetails[0]?.studentName;
  }
  if (curruserDetails[0]?.teacherName) {
    username = curruserDetails[0]?.teacherName;
  }
  if (curruserDetails[0]?.hodName) {
    username = curruserDetails[0]?.hodName;
  }
  if (curruserDetails?.principalName) {
    username = curruserDetails?.principalName;
  }
  return (
    <StyledUserAvatar>
      {/* <Avatar
        src={avatar || "default-user.jpg"}
        alt={`Avatar of ${fullName}`}
      /> */}
      <Avatar src={"default-user.jpg"} alt={`Avatar of Vaibhav`} />
      <span>{username}</span>
    </StyledUserAvatar>
  );
}

export default UserAvatar;
