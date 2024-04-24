import styled from "styled-components";
import { useMoveBack } from "../hooks/useMoveBack";
import Row from "../ui/Row";
import Heading from "../ui/Heading";
import ButtonText from "../ui/ButtonText";
import EachAssesmentBox from "../features/assessmentForStudents/EachAssesmentBox";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

function AssesmentDetails({ newdata, allIds }) {
  const HeadingGroup = styled.div`
    display: flex;
    gap: 2.4rem;
    align-items: center;
  `;
  // const moveBack = useMoveBack();
  // const currData = useSelector((state) => state.student.data);
  // let { assignmentName } = currData;

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Assesment {newdata?.assignmentName}</Heading>
          {/* <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag> */}
        </HeadingGroup>
        {/* <ButtonText onClick={moveBack}>&larr; Back</ButtonText> */}
      </Row>
      {/* <Row> */}
      <EachAssesmentBox newdata={newdata} allIds={allIds} />
      {/* </Row> */}
    </>
  );
}

export default AssesmentDetails;
