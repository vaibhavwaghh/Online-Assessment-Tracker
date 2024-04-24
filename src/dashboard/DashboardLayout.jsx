import styled from "styled-components";
import Stats from "./Stats";
import { useSelector } from "react-redux";
import EachSubject from "../ui/EachSubject";
import EachSubjectDasbboard from "./EachSubjectDasbboard";
const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const data = useSelector((state) => state.student.allSubjects);
  const totalSubj = useSelector((state) => state.student.tSubjects);
  console.log("THIS IS DATA DB", data, totalSubj);
  // const { isLoading: isLoadingBooking, bookings } = useRecentBookings();
  // const {
  //   stays,
  //   confirmedStays,
  //   isLoading: isLoadingStays,
  //   numDays,
  // } = useRecentStays();
  // const { cabins, isLoading: isLoading3 } = useCabins();
  // if (isLoadingBooking || isLoadingStays || isLoading3) return <Spinner />;
  // console.log(bookings, stays, confirmedStays);
  // return (
  //   // <StyledDashboardLayout>

  //     {/* <Stats
  //       tSubjects={totalSubj}
  //       tAssesment={4}
  //       tSubmitted={3}
  //       tApproved={3}
  //     /> */}
  //     {/* <div>Statistics</div> */}
  //     {/* <div>Todays activity</div> */}
  //     {/* <div>Chart stay durations</div> */}
  //     {/* <div>Chart sales</div> */}
  //     {/* <TodayActivity />
  //     <DurationChart confirmedStays={confirmedStays} />
  //     <SalesChart bookings={bookings} numDays={numDays} /> */}
  //   // </StyledDashboardLayout>
  // );

  return (
    <>
      <div>
        {data?.map((subject) => (
          <EachSubjectDasbboard key={subject.id} subject={subject} />
        ))}
      </div>
    </>
  );
}

export default DashboardLayout;
