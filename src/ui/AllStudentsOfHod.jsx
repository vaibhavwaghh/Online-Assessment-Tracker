import { useSelector } from "react-redux";
import HodAllOperation from "../features/operations/HodAllOperation";
import { useMoveBack } from "../hooks/useMoveBack";
import ButtonText from "./ButtonText";
import Heading from "./Heading";
import Row from "./Row";
import { useHodSubject } from "../features/hod/useHod";
import Spinner from "./Spinner";
import TeacherAllOperations from "../features/operations/TeacherAllOperations";
import TeacherTable from "../features/teacher/TeacherTable";

function AllStudentsOfHod() {
  const moveBack = useMoveBack();
  const yearId = useSelector((state) => state.student.currYearId);
  // const { year } = useParams();
  const { data, isLoading } = useHodSubject(yearId);
  if (isLoading) return <Spinner />;
  return (
    <>
      <>
        <Row type="horizontal">
          <Heading as="h1">All Students</Heading>
          <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
          <TeacherAllOperations />
        </Row>
        <Row>
          <TeacherTable />
        </Row>
      </>
    </>
  );
}

export default AllStudentsOfHod;
