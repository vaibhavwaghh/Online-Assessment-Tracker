import Button from "../../../ui/Button";
import Modal from "../../../ui/Modal";
import UpdateStudentForm from "./UpdateStudentForm";

function UpdateStudentAssesment({ studentId }) {
  return (
    <>
      <Modal>
        <Modal.Open opens="assignment-form">
          <Button>Update Marks</Button>
        </Modal.Open>

        <Modal.Window name="assignment-form">
          <UpdateStudentForm studentId={studentId} />
        </Modal.Window>
      </Modal>
    </>
  );
}

export default UpdateStudentAssesment;
