import Table from "../../ui/Table";

function AssesmentRow({ assesment, teacher }) {
  const { assignmentName } = assesment;
  return (
    <Table.Row>
      <div></div>
      <div>{assignmentName}</div>
      <div>{teacher}</div>
    </Table.Row>
  );
}

export default AssesmentRow;
