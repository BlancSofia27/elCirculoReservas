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
          
      {/* Barra de búsqueda por nombre */}
      <div className="m-2">
        <label htmlFor="search" className="block text-lg font-medium">Buscar por Nombre:</label>
        <input
          type="text"
          id="search"
          placeholder="Ingresa Un Nombre"
          className="border p-1 w-full rounded-lg"
        />
      </div>

      {/* Filtro por tipo de cancha */}
      <div className="m-2  ">
        <label htmlFor="cancha" className="block text-lg font-medium ">Filtrar por Tipo de Cancha:</label>
        <select id="cancha" className="border p-1 w-full text-gray-800 rounded-lg">
          <option value="">Todas</option>
          <option value="tenis">Tenis</option>
          <option value="futbol5">Fútbol 5</option>
          <option value="futbol6">Fútbol 6</option>
          <option value="padel">Pádel</option>
        </select>
      </div>
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
