import Filter from "../ui/Filter";
import TableOperations from "../ui/TableOperations";

function PrincipalAllOpeartion({ data }) {
  return (
    <TableOperations>
      <Filter
        filterField="year"
        options={data.map((year) => ({
          value: `${year.id}`,
          label: `${year.currentYear}`,
        }))}
        user="principal"
      />
    </TableOperations>
  );
}

export default PrincipalAllOpeartion;
