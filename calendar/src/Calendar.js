import React, { useState } from 'react';
import './Calendar.css';



function Calendar() {
  const currentMonth = 9; // October (0-based index)
  const currentYear = 2023;

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);

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
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calendar;
