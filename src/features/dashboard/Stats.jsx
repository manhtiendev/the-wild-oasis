import PropTypes from 'prop-types';
import Stat from './Stat';
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from 'react-icons/hi2';
import { formatCurrency } from '../../utils/helpers';

const Stats = ({ bookings, confirmedStays, numDays, cabinCount }) => {
  const numBookings = bookings.length;

  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

  const checkins = confirmedStays.length;

  const occupation =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) / (numDays * cabinCount);

  return (
    <>
      <Stat title={'Bookings'} value={numBookings} icon={<HiOutlineBriefcase />} color='blue' />
      <Stat
        title={'Sales'}
        value={formatCurrency(sales)}
        icon={<HiOutlineBanknotes />}
        color='green'
      />
      <Stat title={'Check ins'} value={checkins} icon={<HiOutlineCalendarDays />} color='indigo' />
      <Stat
        title={'Occupancy rate'}
        value={`${Math.round(occupation * 100)}%`}
        icon={<HiOutlineChartBar />}
        color='yellow'
      />
    </>
  );
};

export default Stats;

Stats.propTypes = {
  bookings: PropTypes.array,
  confirmedStays: PropTypes.array,
  numDays: PropTypes.number,
  cabinCount: PropTypes.number,
};
