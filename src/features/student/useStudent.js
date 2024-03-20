import { useQuery } from "@tanstack/react-query";

import { getStudent } from "../../services/apiStudent";

export function useStudent() {
  const { isLoading, data } = useQuery({
    queryKey: ["studentDetailAndSubjects"],
    queryFn: getStudent,
  });

  return { isLoading, data };
}
