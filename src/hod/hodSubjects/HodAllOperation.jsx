import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";
import PropTypes from "prop-types";

function HodAllOperation({ data }) {
  return (
    <TableOperations>
      <Filter
        filterField="subject"
        options={data.map((subject) => ({
          value: `${subject.id}`,
          label: `${subject.subjectName}`, // Assuming your divArray elements have the format "divX"
        }))}
        user="hod"
      />
    </TableOperations>
  );
}

HodAllOperation.propTypes = {
  data: PropTypes.array.isRequired,
};

export default HodAllOperation;
