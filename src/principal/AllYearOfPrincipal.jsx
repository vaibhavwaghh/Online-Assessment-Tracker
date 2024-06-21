import { useParams, useSearchParams } from "react-router-dom";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { useSelector } from "react-redux";
import Spinner from "../ui/Spinner";
import { useHod } from "../hod/hodSubjects/useHod";
import PrincipalAllOpeartion from "./PrincipalAllOpeartion";

import PrincipalEachYear from "./PrincipalEachYear";
import AllAssesmentOfHod from "../hod/assesmentForHod/AllAssesmentOfHod";

function AllYearOfPrincipal() {
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

export default AllYearOfPrincipal;
