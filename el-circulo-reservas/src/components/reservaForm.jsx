import React from 'react';

const ReservaForm = ({ nombre, setNombre, total, handleSubmit }) => {
  return (
    <div className="mt-4">
      <label htmlFor="nombre" className="block text-lg font-medium mb-2">Nombre:</label>
      <input
        type="text"
        id="nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        className="mb-4 p-3 border border-gray-300 rounded w-full"
      />
      <p className="text-lg font-semibold mb-4">Total: ${total}</p>
      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-blue-500 text-white rounded w-full hover:bg-blue-600"
      >
        Confirmar Reserva
      </button>
    </div>
  );
};

export default ReservaForm;
