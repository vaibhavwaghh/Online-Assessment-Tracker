import Stat from "./Stat";
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
function Stats({ tSubjects, tAssesment, tSubmitted, tApproved }) {
  return (
    <>
      <Stat
        title="Total Subjects"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={tSubjects}
      />
      <Stat
        title="Total Assesment"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={tAssesment}
      />
      <Stat
        title="Submitted Assesment"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={tSubmitted}
      />
      <Stat
        title="Approved Assesment"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={tApproved}
      />
    </>
  );
}

export default Stats;
