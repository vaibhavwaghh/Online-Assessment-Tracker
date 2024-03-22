import { useQuery } from "@tanstack/react-query";
import { getAssessmentOfSubject } from "../../services/apiAssessment";

export default function useStudent(subjectName) {
  const { isLoading, data } = useQuery({
    queryKey: [`assessmentOf${subjectName}`],
    queryFn: () => getAssessmentOfSubject(subjectName),
  });

  // Extract teacher and assessment data from the returned data
  const teacher = data?.teacher;
  const assessmentData = data?.assessmentData;

  return { isLoading, teacher, assessmentData };
}
