import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAssessmentOfSubject,
  submitNewAssessment,
} from "../../services/apiAssessment";
import toast from "react-hot-toast";

export function useGetAllAssessment(subjectName) {
  const { isLoading, data } = useQuery({
    queryKey: [`assessmentOf${subjectName}`],
    queryFn: () => getAssessmentOfSubject(subjectName),
  });

  // Extract teacher and assessment data from the returned data
  const teacher = data?.teacher;
  const assessmentData = data?.assessmentData;

  return { isLoading, teacher, assessmentData };
}

export function useUploadAssesment() {
  const queryClient = useQueryClient();
  const { isLoading: isUploading, mutate: uploadFile } = useMutation({
    mutationFn: (data) => submitNewAssessment(data),
    onSuccess: () => {
      toast.success("SUCCESSFULLY CREATED A NEW CABIN");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isUploading, uploadFile };
}
