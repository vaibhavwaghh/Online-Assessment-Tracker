import Input from "../../../ui/Input";
import Form from "../../../ui/Form";
import Button from "../../../ui/Button";
import FileInput from "../../../ui/FileInput";
import Textarea from "../../../ui/Textarea";
import { useForm } from "react-hook-form";
import FormRow from "../../../ui/FormRow";
import { useSelector } from "react-redux";
import useCreateAssesment from "./useCreateAssesment";

function CreateNewAssessmentForm({ onCloseModal }) {
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;
  console.log("ERRORS FROM FORMSTATE", errors);

  const subjectOfAssignment = useSelector((state) => state.student.subjectId);
  const teacherId = useSelector((state) => state.student.teacherId);

  const { isCreating, createAssignment } = useCreateAssesment();

  function submitFn(data) {
    const file = data.assignmentInformation[0];
    const insertData = {
      ...data,
      assignmentInformation: file,
      subjectOfAssignment,
      teacherId,
    };

    console.log("THIS IS INSERTED DATA", insertData);
    createAssignment(insertData, {
      onSuccess: (data) => {
        console.log("this is success data", data);
        reset();
        onCloseModal?.();
      },
    });
  }
  function errorFn(errors) {
    console.log(errors);
  }
  return (
    <Form
      onSubmit={handleSubmit(submitFn, errorFn)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Assignment name" error={errors?.assignmentName?.message}>
        <Input
          type="text"
          id="assignmentName"
          disabled={isCreating}
          {...register("assignmentName", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="Deadline of Assignment" error={errors?.deadline?.message}>
        <Input
          type="date"
          id="deadline"
          disabled={isCreating}
          {...register("deadline", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Marks" error={errors?.assignedMarks?.message}>
        <Input
          type="number"
          id="assignedMarks"
          disabled={isCreating}
          {...register("assignedMarks", {
            required: "This field is required",
            max: {
              value: 100,
              message: "Marks must be less than or equal to 100",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Description for assignment"
        error={errors?.description?.message}
      >
        <Textarea
          id="description"
          defaultValue=""
          {...register("description", {
            required: "This field is required",
            maxLength: {
              value: 30,
              message: "Description must be less than 30 characters",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Assignment pdf"
        error={errors?.assignmentInformation?.message}
      >
        <FileInput
          id="assignmentInformation"
          accept=".pdf"
          type="file"
          disabled={isCreating}
          {...register("assignmentInformation", {
            required: "This field is required",
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
        <Button disabled={isCreating}>Create a new Assignment</Button>
      </FormRow>
    </Form>
  );
}

export default CreateNewAssessmentForm;
