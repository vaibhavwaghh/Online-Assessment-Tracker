import styled from "styled-components";
import AssesmentFile from "./AssesmentFile";
import Button from "../../ui/Button";
import { useSelector } from "react-redux";

// Styled components for the box
const Box = styled.div`
  border: 2px solid #ccc;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
`;

const Column = styled.div`
  flex-basis: calc(50% - 2rem); /* 50% width with a gap of 4rem */
`;

const Info = styled.div`
  margin-top: 10px;
`;

const Label = styled.span`
  font-weight: bold;
`;

const Value = styled.span`
  margin-left: 10px;
`;

function EachAssesmentBox() {
  const currData = useSelector((state) => state.student.data);
  const allIds = useSelector((state) => state.student.allIds);
  let { assignedMarks, description, teacherName, data } = currData;

  const handleDownload2 = () => {
    window.open(data?.solutionPdf, "_blank");
  };

  return (
    <Box>
      <Column>
        <Info>
          <Label>Teacher Name:</Label>
          <Value>{teacherName}</Value>
        </Info>
        <Info>
          <Label>Description:</Label>
          <Value>{description}</Value>
        </Info>
        <Info>
          <Label>Marks:</Label>
          <Value>
            {data?.submittedMarks ? (
              <span style={{ color: "blue" }}>
                {data.submittedMarks}/{assignedMarks}
              </span>
            ) : (
              <span style={{ color: "red" }}>0/{assignedMarks}</span>
            )}
          </Value>
        </Info>
      </Column>
      <Column>
        {data?.status && (
          <Info>
            <Label>Status:</Label>
            <Value>
              <span style={{ color: "blue" }}>Submitted</span>{" "}
            </Value>
          </Info>
        )}
        {data?.status && (
          <Info>
            <Label>Approved:</Label>
            <Value>
              {data?.approved ? (
                <span style={{ color: "blue" }}>YES</span>
              ) : (
                <span style={{ color: "red" }}>NO</span>
              )}
            </Value>
          </Info>
        )}
        {data?.solutionPdf && (
          <Info>
            <Label>Solution PDF:</Label>
            <Value>
              <Button onClick={handleDownload2}>View</Button>
            </Value>
          </Info>
        )}
        {!data?.solutionPdf && (
          <Info style={{ display: "flex", alignItems: "center" }}>
            <Label>Upload File:</Label>
            <Value>
              <AssesmentFile allIds={allIds} />
            </Value>
          </Info>
        )}
      </Column>
    </Box>
  );
}

export default EachAssesmentBox;
