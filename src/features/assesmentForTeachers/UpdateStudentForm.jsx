import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import { createNewAssignment } from "../../services/apiAssessment";
import { useSelector } from "react-redux";
import useUpdateAssesment from "./useUpdateAssignment";

function UpdateStudentForm({ onCloseModal, studentId }) {
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;
  console.log("ERRORS FROM FORMSTATE", errors);
  const assignedMarks = useSelector((state) => state.student.marks);
  const subjectId = useSelector((state) => state.student.subjectId);

  const assignmentId = useSelector((state) => state.student.assignmentId);

  const { isUpdating, updateAssignment } = useUpdateAssesment();
  const allIds = { subjectId, assignmentId, studentId };

  function submitFn(data) {
    data?.approved.toLowerCase() == "yes"
      ? (data.approved = true)
      : (data.approved = false);

    let insertedData = { data, allIds };
    console.log(insertedData);
    updateAssignment(insertedData, {
      onSuccess: (data) => {
        console.log(data);
        reset();
        onCloseModal?.();
      },
    });
  }
  function errorFn(errors) {
    console.log(errors);
  }
  return (
    <div>
      <Form
        onSubmit={handleSubmit(submitFn, errorFn)}
        type={onCloseModal ? "modal" : "regular"}
      >
        <FormRow label="Approve Assignment" error={errors?.approved?.message}>
          <Input
            type="text"
            id="approved"
            disabled={isUpdating}
            {...register("approved", {
              required: "This field is required",
              pattern: {
                value: /^(yes|no)$/i,
                message: "Please enter 'yes' or 'no'",
              },
            })}
          />
        </FormRow>
        <FormRow
          label="Marks for Assignment"
          error={errors?.submittedMarks?.message}
        >
          <Input
            type="number"
            id="submittedMarks"
            disabled={isUpdating}
            {...register("submittedMarks", {
              required: "This field is required",
              max: {
                value: assignedMarks,
                message: `Marks must be less than ${assignedMarks}`,
              },
            })}
          />
        </FormRow>
        <FormRow>
          <Button
            variation="secondary"
            type="reset"
            onClick={() => onCloseModal?.()}
          >
            Cancel
          </Button>
          <Button disabled={isUpdating}>Update Marks</Button>
        </FormRow>
      </Form>
    </div>
  );
}

export default UpdateStudentForm;
