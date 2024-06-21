import AssesmentDetails from "../../pages/AssesmentDetails";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";

function DetailsModel({ newdata, allIds }) {
  return (
    <Modal>
      <Modal.Open opens="assignment-form">
        <Button>View</Button>
      </Modal.Open>

      <Modal.Window name="assignment-form">
        <AssesmentDetails newdata={newdata} allIds={allIds} />
      </Modal.Window>
    </Modal>
  );
}

export default DetailsModel;
