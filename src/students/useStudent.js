import { useQuery } from "@tanstack/react-query";

import { getSubjectOfStudent } from "../services/apiStudent";

export function useStudent(year, departmentName) {
  const { isLoading, data } = useQuery({
    queryKey: ["studentSubjects"],
    queryFn: () => getSubjectOfStudent(year, departmentName),
  });

  return { isLoading, data };
}
