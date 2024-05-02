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
import { useDispatch } from "react-redux";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
function AllStudentsOfHod({ isPrincipal = 0 }) {
  const yearId = useSelector((state) => state.student.currYearId);
  const { data, isLoading } = useHodSubject(yearId);
  const subject = useSelector((state) => state.student.subjName);
  const year = useSelector((state) => state.student.currYear);
  const [searchParams] = useSearchParams();
  let division = searchParams.get("division");
  const navigate = useNavigate();
  const location = useLocation();
  const currentUrl = location.pathname;
  let newpath;
  // let updatedUrl1 = currentUrl.replace(/\/Ass4$/, `?subject=${subject}`);
  if (isPrincipal) {
    newpath = `?year=${year}&subject=${subject}`;
  } else {
    newpath = `?subject=${subject}`;
  }
  const changedUrl = currentUrl.split("/").slice(0, -1).join("/");

  const newUrl = `${changedUrl}${newpath}`;
  function moveBack() {
    navigate(newUrl);
  }
  if (isLoading) return <Spinner />;
  return (
    <>
      <>
        <Row type="horizontal">
          <Heading as="h1">All Students</Heading>
          <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
          {/* <div>Year :- {year}</div> */}
          <div>Subject :- {subject}</div>
          <TeacherAllOperations />
        </Row>
        {division ? (
          <Row>
            <TeacherTable isTeacher={0} />
          </Row>
        ) : (
          <h1>Select a division</h1>
        )}
      </>
    </>
  );
}

export default AllStudentsOfHod;
