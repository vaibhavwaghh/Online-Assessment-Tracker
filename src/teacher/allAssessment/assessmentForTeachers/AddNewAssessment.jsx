import Button from "../../../ui/Button";
import Modal from "../../../ui/Modal";
import CreateNewAssessmentForm from "./CreateNewAssessmentForm";

function AddNewAssessment() {
  return (
    <>
      <Modal>
        <Modal.Open opens="assignment-form">
          <Button>Add New Assignment</Button>
        </Modal.Open>

        <Modal.Window name="assignment-form">
          <CreateNewAssessmentForm />
        </Modal.Window>
      </Modal>
    </>
  );
}

export default AddNewAssessment;
