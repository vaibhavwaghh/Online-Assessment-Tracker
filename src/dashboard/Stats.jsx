import Stat from "./Stat";
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
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
        value={cabinCount}
      />
      <Stat
        title="Total Assesment"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={bookings}
      />
      <Stat
        title="Submitted Assesment"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={confirmedStays}
      />
      <Stat
        title="Approved Assesment"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={numDays}
      />
    </>
  );
}

export default Stats;
