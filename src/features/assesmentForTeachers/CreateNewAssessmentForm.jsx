import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";

import Spinner from "../../ui/Spinner";
import FormRow from "../../ui/FormRow";
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
    console.log(insertData);
    createAssignment(insertData, {
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

      <FormRow label="Marks" error={errors?.marks?.message}>
        <Input
          type="number"
          id="marks"
          disabled={isCreating}
          {...register("marks", {
            required: "This field is required",
            min: { value: 100, message: "Marks must be less than 100" },
          })}
        />
      </FormRow>

      {/* <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isCreating}
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              value <= getValues("regularPrice") ||
              "Discount should be less than regular Price",
          })}
        />
      </FormRow>  */}

      <FormRow
        label="Description for assignment"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow
        label="Assignment pdf"
        error={errors?.assignmentInformation?.message}
      >
        <FileInput
          id="assignmentInformation" // Give it a descriptive ID
          accept=".pdf" // Specify that only PDF files are allowed
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
