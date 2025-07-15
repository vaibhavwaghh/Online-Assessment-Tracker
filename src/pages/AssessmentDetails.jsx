import styled from "styled-components";

import Row from "../ui/Row";
import Heading from "../ui/Heading";

import EachAssessmentBox from "../students/assessmentForStudents/EachAssessmentBox";
import PropTypes from "prop-types";

function AssessmentDetails({ newdata, allIds }) {
  const HeadingGroup = styled.div`
    display: flex;
    gap: 2.4rem;
    align-items: center;
  `;

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Assessment {newdata?.assignmentName}</Heading>
        </HeadingGroup>
      </Row>

              <EachAssessmentBox newdata={newdata} allIds={allIds} />
    </>
  );
}

AssessmentDetails.propTypes = {
  newdata: PropTypes.object.isRequired,
  allIds: PropTypes.object.isRequired,
};

export default AssessmentDetails;
