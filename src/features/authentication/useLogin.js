import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      console.log("THIS IS FROM USE LOGIN", user?.user);
      queryClient.setQueryData(["user"], user?.user);
      if (user?.user?.user_metadata?.details?.studentId) {
        navigate("/student", { replace: true });
      }
      if (user?.user?.user_metadata?.details?.teacherId) {
        navigate("/teacher", { replace: true });
      }
      if (user?.user?.user_metadata?.details?.hodId) {
        navigate("/hod", { replace: true });
      }
      // if (user?.user?.user_metadata?.details?.teacherId) {
      //   navigate("/teacher", { replace: true });
      // }
      // toast.success("SUCCESSFULLY LOGGED IN");
    },
    onError: (err) => {
      console.log(err);
      toast.error("Provided email/password is incorrect", { duration: 5000 });
    },
  });
  return { login, isLoading };
}

export default useLogin;
