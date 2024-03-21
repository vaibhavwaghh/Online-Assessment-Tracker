import { useQuery } from "@tanstack/react-query";

import { getHod } from "../../services/apiHod";

export function useHod() {
  const { isLoading, data } = useQuery({
    queryKey: ["hodDetails"],
    queryFn: getHod,
  });

  return { isLoading, data };
}
