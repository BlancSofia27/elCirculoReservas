import React from 'react';

const SelectCancha = ({ onCanchaChange }) => {
  const canchas = ['Tenis', 'Paddle', 'Fútbol 5', 'Fútbol 6'];

  return (
    <div className="mb-4">
      <label htmlFor="cancha" className="block text-lg font-medium mb-2">Selecciona la cancha:</label>
      <select
        id="cancha"
        onChange={(e) => onCanchaChange(e.target.value)}
        className="p-3 border border-gray-300 rounded w-full text-black"
      >
        <option value="" className='text-black'>Seleccione una cancha</option>
        {canchas.map((cancha) => (
          <option className='text-black' key={cancha} value={cancha}>
            {cancha}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectCancha;
