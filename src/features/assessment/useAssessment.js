import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAssessmentOfSubject,
  getStatusOfCurrentAssignment,
  submitNewAssessment,
} from "../../services/apiAssessment";
import toast from "react-hot-toast";

export function useGetAllAssessment(subjectName) {
  const { isLoading, data: assessmentData } = useQuery({
    queryKey: [`assessmentOf${subjectName}`],
    queryFn: () => getAssessmentOfSubject(subjectName),
  });

  // Extract teacher and assessment data from the returned data

  return { isLoading, assessmentData };
}

export function useUploadAssesment(allIds) {
  const { subjectId, asssignmentId: assignmentId } = allIds;
  const queryClient = useQueryClient();
  const { isLoading: isUploading, mutate: uploadFile } = useMutation({
    mutationFn: (data) => submitNewAssessment(data),
    onSuccess: () => {
      toast.success("SUCCESSFULLY SUBMITED A NEW ASSIGNMENT");
      queryClient.invalidateQueries({
        queryKey: [
          `statusOfAssessmentSubject_${subjectId}_Assignment_${assignmentId}`,
        ],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isUploading, uploadFile };
}

export function useGetStatusOfAsssessment(allIds) {
  const { subjectId, asssignmentId: assignmentId } = allIds;

  const { isLoading, data } = useQuery({
    queryKey: [
      `statusOfAssessmentSubject_${subjectId}_Assignment_${assignmentId}`,
    ],
    queryFn: () => getStatusOfCurrentAssignment(allIds),
  });

  console.log("DATA FROM STATUS HOOK", data);

  // Check if data is undefined or loading
  // if (isLoading || data === undefined) {
  //   return { isLoading: true, data: false }; // Return null or any other appropriate loading state
  // }
  // Extract teacher and assessment data from the returned data

  return { isLoading, data };
}
