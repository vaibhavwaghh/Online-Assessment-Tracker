import styled from "styled-components";

import { useSelector } from "react-redux";

import EachSubjectDasbboard from "./EachSubjectDasbboard";
const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const data = useSelector((state) => state.student.allSubjects);

  return (
    <>
      <div>
        {data?.map((subject) => (
          <EachSubjectDasbboard key={subject.id} subject={subject} />
        ))}
      </div>
    </>
  );
}

export default DashboardLayout;
