import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getHod } from "../../services/apiHod";
import {
  getAllSubjectsUsingYearId,
  getTeacherIdFromSubjectId,
} from "../../services/apiStudent";
import { useDispatch } from "react-redux";
import { updateteacherId } from "../../redux/userSlice";

export function useHod(id) {
  console.log("THIS IS HOD ID RECIEVED", id);
  const { isLoading, data } = useQuery({
    queryKey: [`hodAllYear${id}`],
    queryFn: () => getHod(id),
  });
  console.log("THIS IS YEAR DATA RETURNED", data);
  return { isLoading, data };
}

export function useHodSubject(yearId) {
  const { isLoading, data } = useQuery({
    queryKey: [`hodAllSubjectOfYear${yearId}`],
    queryFn: () => getAllSubjectsUsingYearId(yearId),
  });

  return { isLoading, data };
}

export function useTeacherSubject() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { isLoading: isCreating, mutate: getTeacherId } = useMutation({
    mutationFn: (subjectId) => getTeacherIdFromSubjectId(subjectId),
    onSuccess: (data) => {
      console.log("THIS IS SUCCESS DATA", data);
      queryClient.invalidateQueries({
        queryKey: [
          `currTeacherAllAssignment,teachersAllStudentsDiv${data[0].id}`,
        ],
      });
      dispatch(updateteacherId(data[0].id));
    },
  });
  return { isCreating, getTeacherId };
}
