import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useUser } from "./useUser";

function UpdateUserDataForm() {
  const {
    user: {
      email,
      user_metadata: { details },
    },
  } = useUser();

  let curruserDetails; // Define curruserDetails outside the if statements

  let currentYear, currentDivision, departmentName, userName, userRole; // Declare variables outside the if blocks

  if (details?.studentId) {
    userRole = "student";
    curruserDetails = details.currstudentDetails;
    // Assign values to variables declared outside
    ({
      currentYear: { currentYear },
      currentDiv: { currentDivision },
      departmentName: { departmentName },
      studentName: userName,
    } = curruserDetails[0]);
  }

  if (details?.teacherId) {
    userRole = "teacher";
    curruserDetails = details.currteacherDetails;
    // Assign values to variables declared outside
    ({
      teachingInYear: { currentYear },
      teachingInDiv: { currentDivision },
      teachingInDepartment: { departmentName },
      teacherName: userName,
    } = curruserDetails[0]);
  }

  return (
    <Form>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>
      <FormRow label="Full name">
        <Input type="text" value={userName} disabled />
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
        <Input type="text" value={userRole} disabled />
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
