import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineChartBar,
  HiOutlineCalendarDays,
} from "react-icons/hi2";
import Stat from "./Stat";
import PropTypes from "prop-types";
function Stats({ tSubjects, tAssessment, tSubmitted, tApproved }) {
  return (
    <>
      <Stat
        title="Total Subjects"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={tSubjects}
      />
      <Stat
        title="Total Assessment"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={tAssessment}
      />
      <Stat
        title="Submitted Assessment"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={tSubmitted}
      />
      <Stat
        title="Approved Assessment"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={tApproved}
      />
    </>
  );
}

Stats.propTypes = {
  tSubjects: PropTypes.number,
  tAssessment: PropTypes.number,
  tSubmitted: PropTypes.number,
  tApproved: PropTypes.number,
};

export default Stats;
