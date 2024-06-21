import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { createNewAssignment } from "../../../services/apiAssessment";
function useCreateAssesment() {
  const queryClient = useQueryClient();
  const { isLoading: isCreating, mutate: createAssignment } = useMutation({
    mutationFn: (newAssignment) => createNewAssignment(newAssignment),
    onSuccess: (data) => {
      console.log(
        `currTeacherAllAssignmentSubject${data[0].subjectOfAssignment}Teacher${data[0].teacherId} ,
        teachersAllStudentsDiv`
      );
      toast.success("SUCCESSFULLY CREATED A NEW ASSIGNMENT");
      queryClient.invalidateQueries({
        queryKey: [
          `currTeacherAllAssignmentSubject${data[0].subjectOfAssignment}Teacher${data[0].teacherId} , teachersAllStudentsDiv`,
        ],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isCreating, createAssignment };
}

export default useCreateAssesment;
