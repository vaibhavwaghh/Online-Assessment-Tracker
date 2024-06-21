import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAllAssignmentOfTeacher,
  getAllTeachersAllStudents,
} from "../../services/apiTeacher";
import toast from "react-hot-toast";

export function useTeacherAllAssignment(allIds) {
  const { subjectId, teacherId } = allIds;

  const { isLoading, data } = useQuery({
    queryKey: [
      `currTeacherAllAssignmentSubject${subjectId}Teacher${teacherId} , teachersAllStudentsDiv`,
    ],
    queryFn: () => getAllAssignmentOfTeacher(allIds),
  });

  return { isLoading, data };
}

export function useGetTeachersAllStudents(divNo, year) {
  const { isLoading, data } = useQuery({
    queryKey: [`teachersAllStudentsDiv${divNo}Year${year}`],
    queryFn: () => getAllTeachersAllStudents(divNo, year),
  });
  return { isLoading, data };
}
