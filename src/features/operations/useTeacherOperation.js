import { useQuery } from "@tanstack/react-query";
import { getTeachersDivNumberUsingTeacherId } from "../../services/apiTeacher";

export function useGetTeachersAllDivisions(teacherId) {
  console.log("THIS IS TEACHER ID", teacherId);
  const { isLoading, data } = useQuery({
    queryKey: [`teachersAllStudentsDiv${teacherId}`],
    queryFn: () => getTeachersDivNumberUsingTeacherId(teacherId),
  });

  return { isLoading, data };
}
