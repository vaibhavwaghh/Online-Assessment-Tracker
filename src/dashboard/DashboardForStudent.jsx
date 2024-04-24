import { useSelector } from "react-redux";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import DashboardLayout from "./DashboardLayout";

function DashboardForStudent() {
  return (
    <>
      {/* <Row type="horizontal">
        <Heading as="h1">Dashboard</Heading>
      </Row> */}
      <DashboardLayout />
    </>
  );
}

export default DashboardForStudent;
