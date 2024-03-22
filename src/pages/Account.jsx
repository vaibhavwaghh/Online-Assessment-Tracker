import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";

import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Account() {
  return (
    <>
      <Heading as="h1">Account details</Heading>

      <Row>
        <UpdateUserDataForm />
      </Row>
    </>
  );
}

export default Account;
