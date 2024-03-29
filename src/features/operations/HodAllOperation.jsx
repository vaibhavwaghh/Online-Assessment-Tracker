import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function HodAllOperation({ data }) {
  return (
    <TableOperations>
      <Filter
        filterField="subject"
        options={data.map((subject) => ({
          value: `${subject.id}`,
          label: `${subject.subjectName}`, // Assuming your divArray elements have the format "divX"
        }))}
        hod="hod"
      />
      {/* <SortBy
          filterField="discount"
          options={[
            { value: "rollNo", label: "Sort By Roll No " },
            { value: "status", label: "Sort By Status " },
            { value: "approved", label: "Sort By Approved " },
          ]}
        /> */}
    </TableOperations>
  );
}

export default HodAllOperation;
