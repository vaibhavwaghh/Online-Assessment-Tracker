import styled from "styled-components";

import Row from "../ui/Row";
import Heading from "../ui/Heading";

import EachAssesmentBox from "../students/assessmentForStudents/EachAssesmentBox";

function AssesmentDetails({ newdata, allIds }) {
  const HeadingGroup = styled.div`
    display: flex;
    gap: 2.4rem;
    align-items: center;
  `;

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Assesment {newdata?.assignmentName}</Heading>
        </HeadingGroup>
      </Row>

      <EachAssesmentBox newdata={newdata} allIds={allIds} />
    </>
  );
}

export default AssesmentDetails;
