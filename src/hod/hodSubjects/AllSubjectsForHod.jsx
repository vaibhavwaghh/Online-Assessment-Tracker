import { useSelector } from "react-redux";
import Spinner from "../../ui/Spinner";
import { useHodSubject } from "./useHod";
import HodAllOperation from "./HodAllOperation";
import Heading from "../../ui/Heading";
import { useParams, useSearchParams } from "react-router-dom";

import Row from "../../ui/Row";
import AllAssesmentOfHod from "../assesmentForHod/AllAssesmentOfHod";

function AllSubjectsForHod() {
  const yearId = useSelector((state) => state.student.currYearId);
  const { year } = useParams();
  const [searchParams] = useSearchParams();
  let subjectName = searchParams.get("subject");
  const { data, isLoading } = useHodSubject(yearId);

  if (isLoading) return <Spinner />;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Subjects of {year}</Heading>
        <HodAllOperation data={data} />
      </Row>
      <hr />
      {subjectName && (
        <Row>
          <AllAssesmentOfHod />
        </Row>
      )}
    </>
  );
}

export default AllSubjectsForHod;
