import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Calendario = ({ onDateChange, selectedDate }) => {
  const handleDateChange = (date) => {
    onDateChange(date);  // Enviar el objeto Date directamente
  };

  return (
    <div className="mb-4">
      <Calendar
        onChange={handleDateChange}  // Usar la función sin formateo
        value={selectedDate}
        className="react-calendar"
      />
    </div>
  );
};

export default Calendario;

