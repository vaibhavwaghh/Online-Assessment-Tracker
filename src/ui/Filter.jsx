import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";
import {
  updateSubjectId,
  updateYearId,
  updateteacherId,
} from "../redux/userSlice";
import Spinner from "./Spinner";
import { useTeacherSubject } from "../features/hod/useHod";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

function Filter({ filterField, options, user }) {
  console.log("THIS IS USER", user);
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();
  const { isCreating, getTeacherId } = useTeacherSubject();
  let currentFilter;
  if (user == "teacher") {
    currentFilter = searchParams.get(filterField) || options[0]?.value;
  }
  if (user == "hod" || user == "principal") {
    if (searchParams.get(filterField)) {
      currentFilter = searchParams.get(filterField);
    } else {
      searchParams.set(filterField, options[0].label);

      // currentFilter = options[0].label;

      setSearchParams(searchParams);
    }
  }
  // if (user == "principal") {
  //   currentFilter = options[0].label;
  // }
  function handleClick(label, value, user) {
    console.log(user);
    if (user == "teacher") {
      searchParams.set(filterField, value);
    }
    if (user == "hod") {
      dispatch(updateSubjectId(value));
      searchParams.set(filterField, label);
      getTeacherId(value);
    }
    if (user == "principal") {
      console.log(filterField);
      dispatch(updateYearId(value));
      searchParams.set(filterField, label);
    }
    // dispatch(updateteacherId());
    setSearchParams(searchParams);
  }
  if (isCreating) return <Spinner />;
  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          key={option.value}
          onClick={() => handleClick(option.label, option.value, user)}
          active={
            user == "teacher"
              ? option.value === currentFilter
              : option.label === currentFilter
          }
          disabled={option.value === currentFilter}
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}

export default Filter;
