import { useSelector } from "react-redux";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { useHodSubject } from "../hod/hodSubjects/useHod";
import HodAllOperation from "../hod/hodSubjects/HodAllOperation";
import { useDispatch } from "react-redux";

import Spinner from "../ui/Spinner";
import { updateCurrentYear } from "../redux/userSlice";
import { useSearchParams } from "react-router-dom";

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
