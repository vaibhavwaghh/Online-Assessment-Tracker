import { useSelector } from "react-redux";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import { useHodSubject } from "../hod/useHod";
import HodAllOperation from "../operations/HodAllOperation";
import { useDispatch } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import { updateCurrentYear } from "../../redux/userSlice";

function PrincipalEachYear() {
  const yearId = useSelector((state) => state.student.currYearId);
  console.log("THIS IS YEAR ID", yearId);
  const [searchParams] = useSearchParams();
  let year = searchParams.get("year");
  const { data, isLoading } = useHodSubject(yearId);
  const dispatch = useDispatch();
  dispatch(updateCurrentYear(year));
  if (isLoading) return <Spinner />;
  return (
    <Row type="horizontal">
      <Heading as="h1">All Subjects of {year}</Heading>
      <HodAllOperation data={data} />
    </Row>
  );
}

export default PrincipalEachYear;
