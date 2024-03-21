import Table from "../../ui/Table";
import { useHod } from "./useHod";

function HodTable() {
  const { isLoading: isLoadingHod, data } = useHod();
  console.log(data);
  return (
    // <Menus>
    <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Table.Header>
        <div></div>
        <div>Hod Name</div>
        <div>All years</div>
        <div>All div</div>
        <div>All teacher</div>
        <div>All students</div>
      </Table.Header>
      {/* <Table.Body
        data={sortedCabins}
        render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
      /> */}
    </Table>
    // </Menus>
  );
}

export default HodTable;
