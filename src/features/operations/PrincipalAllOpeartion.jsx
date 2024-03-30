import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function PrincipalAllOpeartion({ data }) {
  return (
    <TableOperations>
      <Filter
        filterField="year"
        options={data.map((year) => ({
          value: `${year.id}`,
          label: `${year.currentYear}`,
          // Assuming your divArray elements have the format "divX"
        }))}
        user="principal"
      />
    </TableOperations>
  );
}

export default PrincipalAllOpeartion;
