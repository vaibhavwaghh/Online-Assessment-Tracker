import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import UpdateStudentForm from "./UpdateStudentForm";
import { updatestudentId } from "../../redux/userSlice";

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
        {/* <Modal.Open opens="table">
          <Button>Show Table</Button>
        </Modal.Open>
        <Modal.Window name="table">
          <CabinTable />
        </Modal.Window> */}
      </Modal>
    </>
  );
}

export default UpdateStudentAssesment;
