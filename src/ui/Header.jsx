import styled from "styled-components";
import HeaderMain from "../features/authentication/HeaderMain";
import PropTypes from "prop-types";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
`;

function Header({ curruserDetails }) {
  return (
    <StyledHeader>
      <HeaderMain curruserDetails={curruserDetails} />
    </StyledHeader>
  );
}

Header.propTypes = {
  curruserDetails: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
};

export default Header;
