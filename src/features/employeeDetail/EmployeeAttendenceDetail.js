
import React, { useState, useEffect } from 'react';

const daysInMonth = (month, year) => {
  return new Date(year, month, 0).getDate();
};

const firstDayOfMonth = (month, year) => {
  return new Date(year, month - 1, 1).getDay();
};

function MonthlyAttendanceDetail({ EmployeeAttendance }) {
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    if (EmployeeAttendance && EmployeeAttendance.length > 0) {
      const formattedAttendance = EmployeeAttendance.map((record) => ({
        date: record.createdAt,
        status: record.status
      }));
      setAttendance(formattedAttendance);
    }
  }, [EmployeeAttendance]);

  const renderDays = () => {
    const days = [];
    
    // Get current year and month
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Month is 0-indexed

    // Calculate number of days in current month and first day index
    const daysInCurrentMonth = daysInMonth(month, year);
    const firstDayIndex = firstDayOfMonth(month, year);

    // Render empty divs for days before the first day of the month
    for (let i = 0; i < firstDayIndex; i++) {
      days.push(<div key={`empty-${i}`} className="border border-gray-300 h-15"></div>);
    }

    // Render days with attendance data
    for (let day = 1; day <= daysInCurrentMonth; day++) {
      const dateStr = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
      
      // Filter attendance records for the current day
      const records = attendance.filter((record) => {
        // Convert record date to yyyy-mm-dd format
        const recordDate = new Date(record.date);
        const recordDateStr = `${recordDate.getFullYear()}-${(recordDate.getMonth() + 1).toString().padStart(2, '0')}-${recordDate.getDate().toString().padStart(2, '0')}`;
       
        // Compare formatted dates
        return recordDateStr === dateStr;
      });

      // Determine status to display
      let statusToDisplay = "N/A";
      if (records.length > 0 && records[0].status !== null) {
        statusToDisplay = records[0].status;
      }

      // Prepare element for the current day
      const dayElement = (
        <div key={day} className={`border border-gray-300 h-15 flex flex-col items-center justify-center ${getStatusColor(statusToDisplay)}`}>
          <span>{day}</span>
          <span>{statusToDisplay}</span>
        </div>
      );

      days.push(dayElement);
    }

    return days;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'present':
        return 'bg-green-500 text-white';
      case 'absent':
        return 'bg-red-500 text-white';
      case 'leave':
        return 'bg-orange-500 text-white';
      case 'N/A':
        return 'bg-gray-400 text-white';
      default:
        return '';
    }
  };

  return (
    <div className="bg-transparent">
      <header className="lg:w-2/4 w-full m-auto">
        <h1 className="text-xl font-bold mb-6">Monthly Attendance</h1>
        <div className="grid grid-cols-7 gap-1 mt-4">
          <div className="font-bold">Sun</div>
          <div className="font-bold">Mon</div>
          <div className="font-bold">Tue</div>
          <div className="font-bold">Wed</div>
          <div className="font-bold">Thu</div>
          <div className="font-bold">Fri</div>
          <div className="font-bold">Sat</div>
          {renderDays()}
        </div>
      </header>
    </div>
  );
}

export default MonthlyAttendanceDetail;
