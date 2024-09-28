import React, { useState, useEffect } from 'react';
import Calendario from '../components/calendar'; // Asumiendo que ya tienes este componente de calendario
import { obtenerReservasPorFecha } from '../supabase/api'; // Función para obtener las reservas por fecha desde Supabase

const AdminReservasTable = () => {
  const [fecha, setFecha] = useState(null);
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (fecha) {
      const fetchReservas = async () => {
        setLoading(true);
        setError(null);
        try {
          const result = await obtenerReservasPorFecha(fecha); // Función para obtener las reservas según la fecha
          if (result.success) {
            setReservas(result.data);
          } else {
            setError('Error al obtener reservas');
          }
        } catch (err) {
          setError('Error al obtener reservas');
        } finally {
          setLoading(false);
        }
      };

      fetchReservas();
    }
  }, [fecha]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Reservas del día</h1>
      
      {/* Componente de calendario */}
      <Calendario onDateChange={setFecha} selectedDate={fecha} />

      {/* Mostrar tabla solo si hay una fecha seleccionada */}
      {fecha && (
        <div className="mt-4">
          <h2 className="text-xl mb-2">Reservas para el {new Date(fecha).toLocaleDateString()}</h2>
          {loading ? (
            <p>Cargando reservas...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : reservas.length > 0 ? (
            <table className="min-w-full bg-zinc-800 border">
              <thead>
                <tr>
                  <th className="py-2 px-4 border bg-blue-500">Nombre</th>
                  <th className="py-2 px-4 border bg-blue-500">Cancha</th>
                  <th className="py-2 px-4 border bg-blue-500">Horario</th>
                </tr>
              </thead>
              <tbody>
                {reservas.map((reserva) => (
                  <tr key={reserva.id}>
                    <td className="py-2 px-4 border">{reserva.nombre}</td>
                    <td className="py-2 px-4 border">{reserva.cancha}</td>
                    <td className="py-2 px-4 border">{reserva.horario}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No hay reservas para esta fecha.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminReservasTable;
