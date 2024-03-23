import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useUser } from "./useUser";

function UpdateUserDataForm() {
  const {
    user: {
      email,
      user_metadata: {
        details: { currUserDetails },
      },
    },
  } = useUser();

  const {
    currentYear: { currentYear },
    currentDiv: { currentDivision },
    departmentName: { departmentName },
    studentName,
  } = currUserDetails[0];
  console.log(
    email,
    departmentName,
    currentDivision,
    studentName,

    currentYear
  );

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   if (!fullName) return;
  //   updateUser(
  //     { fullName, avatar },
  //     {
  //       onSuccess: () => {
  //         setAvatar(null);
  //         e.target.reset();
  //       },
  //     }
  //   );
  // }
  // function handleCancel() {
  //   setFullName(currentFullName);
  //   setAvatar(null);
  // }
  return (
    <Form>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>
      <FormRow label="Full name">
        <Input type="text" value={studentName} disabled />
      </FormRow>
      <FormRow label="Department Name">
        <Input type="text" value={departmentName} disabled />
      </FormRow>
      <FormRow label="Current Year">
        <Input type="number" value={currentYear} disabled />
      </FormRow>
      <FormRow label="Current Division">
        <Input type="number" value={currentDivision} disabled />
      </FormRow>
      <FormRow label="Role">
        <Input type="text" value="student" disabled />
      </FormRow>
      {/* <FormRow>
        <Button
          onClick={handleCancel}
          type="reset"
          variation="secondary"
          disabled={isUpdating}
        >
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update account</Button>
      </FormRow> */}
    </Form>
  );
}

export default UpdateUserDataForm;
