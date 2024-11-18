import styled from 'styled-components';
import Spinner from '../../ui/Spinner';
import { useRecentStays } from './useRecentStays';
import { useRecentBookings } from './useRecentBookings';
import Stats from './Stats';
import { useCabin } from '../cabins/useCabin';
import SalesChart from './SalesChart';
import DurationChart from './DurationChart';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

const DashboardLayout = () => {
  const { bookings, isLoading } = useRecentBookings();
  const { confirmedStays, isLoading: staysLoading, numDays } = useRecentStays();
  const { cabins, isLoading: isLoadingCabin } = useCabin();

  if (isLoading || staysLoading || isLoadingCabin) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins.length}
      />
      <div>Today&apos;s activity</div>
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
};

export default DashboardLayout;
