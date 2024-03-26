import { useQuery } from "@tanstack/react-query";
import {
  getAllAssignmentOfTeacher,
  getAllTeachersAllStudents,
} from "../../services/apiTeacher";

export function useTeacherAllAssignment(allIds) {
  const { subjectId, teacherId } = allIds;

  const { isLoading, data } = useQuery({
    queryKey: [`currTeacherAllAssignment`],
    queryFn: () => getAllAssignmentOfTeacher(allIds),
  });

  console.log("DATA FROM STATUS HOOK", data);

  return { isLoading, data };
}

export function useGetTeachersAllStudents(divNo) {
  const { isLoading, data } = useQuery({
    queryKey: [`teachersAllStudentsDiv${divNo}`],
    queryFn: () => getAllTeachersAllStudents(divNo),
  });
  return { isLoading, data };
}
