import { useQuery } from "@tanstack/react-query";
import { getTeachersDivNumberUsingTeacherId } from "../../services/apiTeacher";

export function useGetTeachersAllDivisions(teacherId) {
  const { isLoading, data } = useQuery({
    queryKey: [`teachersAllStudentsDiv`],
    queryFn: () => getTeachersDivNumberUsingTeacherId(teacherId),
  });
  console.log("DATA RETURNED FROM FUNCTION", data);
  return { isLoading, data };
}
