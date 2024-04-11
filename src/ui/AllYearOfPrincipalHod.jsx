import { useParams, useSearchParams } from "react-router-dom";
import Heading from "./Heading";
import Row from "./Row";
import { useSelector } from "react-redux";
import Spinner from "./Spinner";
import { useHod } from "../features/hod/useHod";
import PrincipalAllOpeartion from "../features/operations/PrincipalAllOpeartion";
import HodAllOperation from "../features/operations/HodAllOperation";
import PrincipalEachYear from "../features/principal/PrincipalEachYear";
import AllAssesmentOfHod from "../pages/AllAssesmentOfHod";

function AllYearOfPrincipalHod() {
  const { departmentName } = useParams();
  const hodId = useSelector((state) => state.student.hodId);

  const { isLoading, data } = useHod(hodId);
  const [searchParams] = useSearchParams();

  let year = searchParams.get("year");
  let subject = searchParams.get("subject");
  if (isLoading) return <Spinner />;
  console.log("ALL YEARS OF DEPARTMENT", data);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Years of {departmentName}</Heading>
        <PrincipalAllOpeartion data={data} />
      </Row>
      <hr />
      {year && (
        <>
          <Row>
            <PrincipalEachYear />
          </Row>
          <hr />
        </>
      )}
      {year && subject && (
        <Row>
          <AllAssesmentOfHod isPrincipal={1} />
        </Row>
      )}
    </>
  );
}

export default AllYearOfPrincipalHod;
