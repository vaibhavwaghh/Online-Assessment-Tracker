import Table from "../../ui/Table";
import { useTeacher } from "./useTeacher";

function TeacherTable() {
  const { isLoading: isLoadingTeacher, data } = useTeacher();
  console.log(data);
  return (
    // <Menus>
    <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Table.Header>
        <div></div>
        <div>Teacher Name</div>
        <div>Year</div>
        <div>Assignments</div>
        <div>Subject</div>
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

export default TeacherTable;
