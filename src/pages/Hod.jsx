import HodTable from "../features/hod/HodTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Hod() {
  return (
    <div>
      <Row type="horizontal">
        <Heading as="h1">All Hods</Heading>
        {/* <CabinTableOperations /> */}
      </Row>
      <Row>
        <HodTable />
      </Row>
      {/* <AddCabin /> */}
    </div>
  );
}

export default Hod;
