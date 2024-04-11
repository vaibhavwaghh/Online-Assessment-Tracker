import Stat from "./Stat";
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
function Stats({ tSubjects, tAssesment, tSubmitted, tApproved }) {
  // const numBookings = bookings.length;

  // // const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

  // // const checkins = confirmedStays.length;
  // console.log(numDays, cabinCount);
  // const occupation =
  //   confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
  //   (cabinCount * numDays);
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
