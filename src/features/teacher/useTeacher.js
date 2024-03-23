import { useQuery } from "@tanstack/react-query";
import {
  getAllAssignmentOfTeacher,
  getTeacher,
} from "../../services/apiTeacher";

export function useTeacher() {
  const { isLoading, data } = useQuery({
    queryKey: ["teacherDetailAndAssignment"],
    queryFn: getTeacher,
  });

  return { isLoading, data };
}

export function useTeacherAllAssignment(allIds) {
  const { subjectId, teacherId } = allIds;

  const { isLoading, data } = useQuery({
    queryKey: [`currTeacherAllAssignment${teacherId}subject${subjectId}`],
    queryFn: () => getAllAssignmentOfTeacher(allIds),
  });

  console.log("DATA FROM STATUS HOOK", data);

  return { isLoading, data };
}
