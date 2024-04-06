import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAssessmentOfSubject,
  getStatusOfCurrentAssignment,
  submitNewAssessment,
} from "../../services/apiAssessment";
import toast from "react-hot-toast";
import { useMoveBack } from "../../hooks/useMoveBack";

export function useGetAllAssessment(subjectName) {
  const { isLoading, data: assessmentData } = useQuery({
    queryKey: [`assessmentOf${subjectName}`],
    queryFn: () => getAssessmentOfSubject(subjectName),
  });

  // Extract teacher and assessment data from the returned data

  return { isLoading, assessmentData };
}

export function useUploadAssesment(allIds) {
  const { studentId, subjectId, asssignmentId: assignmentId } = allIds;
  const moveBack = useMoveBack();
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
      moveBack();
    },
    onError: (err) => {
      toast.error(err.message);
      moveBack();
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

  // console.log("DATA FROM STATUS HOOK", data);

  // Check if data is undefined or loading
  // if (isLoading || data === undefined) {
  //   return { isLoading: true, data: false }; // Return null or any other appropriate loading state
  // }
  // Extract teacher and assessment data from the returned data

  return { isLoading, data };
}
