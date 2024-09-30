import React from 'react';

const SelectCancha = ({ onCanchaChange }) => {
  const canchas = ['Tenis', 'Paddle', 'Fútbol 5', 'Fútbol 6'];

  return (
    <div className="mb-4 xl:w-[500px] lg:w-[500px]">
      <label htmlFor="cancha" className="block text-lg font-medium mb-2">Selecciona la cancha:</label>
      <select
        id="cancha"
        onChange={(e) => onCanchaChange(e.target.value)}
        className="p-3 border bg-zinc-800 border-gray-300 rounded w-full text-white"
      >
        <option value="" className='text-gray-400 bg-normal'>Seleccione una cancha</option>
        {canchas.map((cancha) => (
          <option className='text-gray-400 bg-normal' key={cancha} value={cancha}>
            {cancha}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectCancha;
