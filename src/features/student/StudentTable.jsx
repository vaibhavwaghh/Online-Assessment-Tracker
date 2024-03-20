import Table from "../../ui/Table";
import { useStudent } from "./useStudent";

function StudentTable() {
  const { isLoading: isLoadingStudents, data } = useStudent();

  return (
    // <Menus>
    <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Table.Header>
        <div></div>
        <div>Subject Name</div>
        <div>Teacher</div>
        <div>Assignments</div>
        <div>Completed</div>
        <div></div>
      </Table.Header>
      {/* <Table.Body
        data={sortedCabins}
        render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
      /> */}
    </Table>
    // </Menus>
  );
}

export default StudentTable;
