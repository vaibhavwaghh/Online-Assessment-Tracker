import { useQuery } from "@tanstack/react-query";
import { getTeacher } from "../../services/apiTeacher";

export function useTeacher() {
  const { isLoading, data } = useQuery({
    queryKey: ["teacherDetailAndAssignment"],
    queryFn: getTeacher,
  });

  return { isLoading, data };
}
