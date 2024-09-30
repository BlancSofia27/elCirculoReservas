import React, { useEffect, useState } from 'react';
import { obtenerDisponibilidad } from '../supabase/api';

const SelectHorario = ({ fecha, cancha, onHorarioSeleccionado }) => {
  const [horariosDisponibles, setHorariosDisponibles] = useState([]);
  const [horarioSeleccionado, setHorarioSeleccionado] = useState(null);

  useEffect(() => {
    const actualizarHorariosDisponibles = async () => {
      const horariosFiltrados = await obtenerDisponibilidad(fecha, cancha);
      setHorariosDisponibles(horariosFiltrados);
    };

    actualizarHorariosDisponibles();
  }, [fecha, cancha]);

  const manejarSeleccion = (hora) => {
    setHorarioSeleccionado(hora);
    onHorarioSeleccionado(hora); // Envía el valor seleccionado al componente padre
  };

  return (
    <div className=''>
      <h2 className='my-3 font-bold'>Horarios Disponibles:</h2>
      <div className="grid grid-cols-3 xs:gap-4 xl:gap-2 p-3 xl:w-[500px]">
        {horariosDisponibles.length > 0 ? (
          horariosDisponibles.map((hora, index) => (
            <button
              key={index}
              className={`btn-horario ${hora === horarioSeleccionado ? 'bg-blue-500' : 'bg-green-500'} text-white font- text-lg py-2 px-4 rounded `}
              onClick={() => manejarSeleccion(hora)}
            >
              {hora}
            </button>
          ))
        ) : (
          <p>No hay horarios disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default SelectHorario;
