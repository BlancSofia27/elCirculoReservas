import React, { useEffect, useState } from 'react';
import { obtenerDisponibilidadTenis } from '../supabase/api';

const SelectHorario = ({ fecha, cancha, onHorarioSeleccionado }) => {
  const [horariosDisponibles, setHorariosDisponibles] = useState([]);
  const [horarioSeleccionado, setHorarioSeleccionado] = useState(null);

  useEffect(() => {
    const actualizarHorariosDisponibles = async () => {
      const horariosFiltrados = await obtenerDisponibilidadTenis(fecha, cancha);
      setHorariosDisponibles(horariosFiltrados);
    };

    actualizarHorariosDisponibles();
  }, [fecha, cancha]);

  const manejarSeleccion = (hora) => {
    setHorarioSeleccionado(hora);
    onHorarioSeleccionado(hora); // Envía el valor seleccionado al componente padre
  };

  return (
    <div>
      <h2>Horarios Disponibles</h2>
      <div className="grid grid-cols-3 gap-4">
        {horariosDisponibles.length > 0 ? (
          horariosDisponibles.map((hora, index) => (
            <button
              key={index}
              className={`btn-horario ${hora === horarioSeleccionado ? 'bg-blue-500' : 'bg-green-500'} text-white py-2 px-4 rounded`}
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
