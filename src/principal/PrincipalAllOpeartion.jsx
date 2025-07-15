import Filter from "../ui/Filter";
import TableOperations from "../ui/TableOperations";
import PropTypes from "prop-types";

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

PrincipalAllOpeartion.propTypes = {
  data: PropTypes.array.isRequired,
};

export default PrincipalAllOpeartion;
