import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { updateCurrentAssignment } from "../../../services/apiAssessment";

function useUpdateAssesment() {
  const queryClient = useQueryClient();
  const { isLoading: isUpdating, mutate: updateAssignment } = useMutation({
    mutationFn: (insertedData) => updateCurrentAssignment(insertedData),
    onSuccess: (data) => {
      console.log(
        "DATA FROM ON SUCCESS HANDLE",
        data[0].assignmentId,
        data[0].studentId,
        data[0].subjectId
      );
      toast.success("SUCCESSFULLY UPDATED A STUDENTS MARKS");
      queryClient.invalidateQueries({
        queryKey: [
          `statusOfAssessmentSubject_${data[0].subjectId}_Assignment_${data[0].assignmentId}_Student_${data[0].studentId}`,
        ],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isUpdating, updateAssignment };
}

export default useUpdateAssesment;
