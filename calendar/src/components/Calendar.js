import React, { useEffect, useState } from 'react';
import './Calendar.css';
import axios from 'axios';



function Calendar( {year, month }) {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth(); // October (0-based index)
  const currentYear = currentDate.getFullYear() - 1;
  const [holidays, setHolidays] = useState([]);

  const [selectedMonth, setSelectedMonth] = useState(parseInt(month, 10) - 1 || currentMonth);
  const [selectedYear, setSelectedYear] = useState(parseInt(year, 10) || currentYear);

  useEffect(() => {
    const parsedYear = parseInt(year, 10);
    const parsedMonth = parseInt(month, 10) - 1;
    console.log(parsedMonth,year);
    if (!isNaN(parsedYear) && !isNaN(parsedMonth)) {
      setSelectedYear(parsedYear);
      setSelectedMonth(parsedMonth);
    }
  }, [year, month]);


  const goToPreviousMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(prevYear => prevYear - 1);
    } else {
      setSelectedMonth(prevMonth => prevMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(prevYear => prevYear + 1);
    } else {
      setSelectedMonth(prevMonth => prevMonth + 1);
    }
  };

  const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1).getDay();

  const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();

  const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const emptyDays = Array.from({ length: firstDayOfMonth }, (_, index) => (
    <div key={`empty-${index}`} className="day-empty"></div>
  ));

  useEffect(() => {
    const apiKey = '750afe29-c607-4dbf-86d0-853a50ca9080';
    const year = selectedYear;
    const month = selectedMonth+1;

    axios
      .get(`https://holidayapi.com/v1/holidays?key=${apiKey}&country=US&year=${year}&month=${month}`)
      .then((response) => {
        setHolidays(response.data.holidays);
      })
      .catch((error) => {
        console.error('Error fetching holidays:', error);
      });
  }, [selectedMonth, selectedYear]);

    const holidaysByDayOfMonth = {};

    holidays.forEach((holiday) => {
      const dayOfMonth = new Date(holiday.date).getDate();

      if (!holidaysByDayOfMonth[dayOfMonth]) {
        holidaysByDayOfMonth[dayOfMonth] = [];
      }

      holidaysByDayOfMonth[dayOfMonth].push(holiday.name);
    });

    console.log(holidaysByDayOfMonth);

  const [selectedHoliday, setSelectedHoliday] = useState(null);

  const handleHolidayClick = (holiday) => {
    setSelectedHoliday(holiday);
  };

  return (
    <div className="calendar">
      {/* Calendar header */}
      <div className="calendar-header">
        <div className="header-left">
        {`${new Date(selectedYear, selectedMonth).toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric',
          })}`}        
        </div>
        <div className="header-right">
          <button onClick={goToPreviousMonth}>Previous</button>
          <button onClick={goToNextMonth}>Next</button>
        </div>
      </div>

      {/* Calendar days */}
      <div className="calendar-days">
        {dayNames.map((dayName, index) => (
          <div key={index} className="day">{dayName}</div>
        ))}

        {/* Render empty placeholder divs for days before the first day */}
        {emptyDays} 

        {/* Render the days of the month */}
        {Array.from({ length: daysInMonth }, (_, index) => (

          <div key={index} className="day">
            <span className="day-number">{index + 1}</span>
            <div className="additional-div">
              {holidaysByDayOfMonth[index + 1] && (
                <ul>
                  {holidaysByDayOfMonth[index + 1].map((holidayName, holidayIndex) => (
                    <li key={holidayIndex}
                      onClick={() => handleHolidayClick(holidayName)}
                      className="holiday" >{holidayName}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
      {selectedHoliday && (
        <div className="selected-holiday">
          <h2>{selectedHoliday}</h2>
          {/* Add more details here */}
          <button onClick={() => setSelectedHoliday(null)}>Close</button>
        </div>
      )}
    </div>

  );
}

export default Calendar;
