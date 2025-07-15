import AssessmentDetails from "../../pages/AssessmentDetails";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import PropTypes from "prop-types";

function DetailsModel({ newdata, allIds }) {
  return (
    <Modal>
      <Modal.Open opens="assignment-form">
        <Button>View</Button>
      </Modal.Open>

      <Modal.Window name="assignment-form">
        <AssessmentDetails newdata={newdata} allIds={allIds} />
      </Modal.Window>
    </Modal>
  );
}

DetailsModel.propTypes = {
  newdata: PropTypes.object.isRequired,
  allIds: PropTypes.object.isRequired,
};

export default DetailsModel;
