import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";
import { updateSubjectId, updateteacherId } from "../redux/userSlice";
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

function Filter({ filterField, options, hod = "" }) {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log("THIS IS FILTER", options);
  const dispatch = useDispatch();
  const { isCreating, getTeacherId } = useTeacherSubject();
  const currentFilter = searchParams.get(filterField) || options[0].value;

  function handleClick(label, value) {
    if (hod == "") {
      searchParams.set(filterField, value);
    }
    if (hod !== "") {
      dispatch(updateSubjectId(value));
      searchParams.set(filterField, label);
      getTeacherId(value);
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
          onClick={() => handleClick(option.label, option.value)}
          active={
            hod == ""
              ? option.value === currentFilter
              : option.label === currentFilter
          }
          // disabled={option.value === currentFilter}
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}

export default Filter;
