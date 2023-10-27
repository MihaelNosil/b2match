import { useRouter } from 'next/router';
import Calendar from '../../components/Calendar'; // Adjust the path as needed

function CalendarPage() {
  const router = useRouter();
  const { year, month } = router.query;

  // Convert year and month to numbers and use them in your component logic
  const selectedYear = parseInt(year, 10);
  const selectedMonth = parseInt(month, 10) - 1;
  console.log(year,month);

  return <Calendar year={selectedYear} month={selectedMonth} />;
}

export default CalendarPage;
