import { useSelector } from "react-redux";

import EachSubjectDasbboard from "./EachSubjectDasbboard";

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
