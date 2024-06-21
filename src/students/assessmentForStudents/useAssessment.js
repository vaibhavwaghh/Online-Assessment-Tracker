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

  return { isLoading, assessmentData };
}

export function useUploadAssesment(allIds) {
  const { studentId, subjectId, asssignmentId: assignmentId } = allIds;

  console.log("THIS IS UPLOADED ASSESMENT", allIds);
  const queryClient = useQueryClient();
  const { isLoading: isUploading, mutate: uploadFile } = useMutation({
    mutationFn: (data) => submitNewAssessment(data),
    onSuccess: () => {
      toast.success("SUCCESSFULLY SUBMITED A NEW ASSIGNMENT");
      queryClient.invalidateQueries({
        queryKey: [
          `statusOfAssessmentSubject_${subjectId}_Assignment_${assignmentId}_Student_${studentId}`,
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
  const { subjectId, asssignmentId: assignmentId, studentId } = allIds;

  const { isLoading, data } = useQuery({
    queryKey: [
      `statusOfAssessmentSubject_${subjectId}_Assignment_${assignmentId}_Student_${studentId}`,
    ],
    queryFn: () => getStatusOfCurrentAssignment(allIds),
  });

  return { isLoading, data };
}
