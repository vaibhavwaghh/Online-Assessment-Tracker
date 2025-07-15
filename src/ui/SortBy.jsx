import { useSearchParams } from "react-router-dom";
import Select from "./Select";
import PropTypes from "prop-types";

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }
  return <Select onChange={handleChange} options={options} />;
}

SortBy.propTypes = {
  options: PropTypes.array.isRequired,
};

export default SortBy;
