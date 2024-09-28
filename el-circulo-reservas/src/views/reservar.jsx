import React, { useState, useEffect } from 'react';
import SelectCancha from '../components/selectCancha';
import SelectorHorario from '../components/selectHorario';
import Calendario from '../components/calendar';
import { crearReserva } from '../supabase/api';
import Hero from '../components/Hero';
import { devolverPrecio } from '../supabase/api';  // Importamos la nueva función

const Reservar = () => {
  const [fecha, setFecha] = useState(null);
  const [cancha, setCancha] = useState('');
  const [horarioSeleccionado, setHorarioSeleccionado] = useState('');  // Capturamos el horario seleccionado
  const [nombre, setNombre] = useState('');
  const [total, setTotal] = useState(0);

  // Calcular el total según el horario seleccionado, la fecha y la cancha
  useEffect(() => {
    const calcularPrecio = async () => {
      if (horarioSeleccionado && fecha && cancha) {
        const nuevoTotal = await devolverPrecio(fecha, horarioSeleccionado);
        if (nuevoTotal !== null) {
          setTotal(nuevoTotal);
        } else {
          alert('No se encontró precio para la combinación de fecha y horario');
          setTotal(0);
        }
      }
    };

    calcularPrecio();
  }, [horarioSeleccionado, fecha, cancha]);

  const handleReserva = async () => {
    try {
      const success = await crearReserva(fecha, horarioSeleccionado, cancha, total, nombre);
      if (success) {
        alert('Reserva realizada con éxito');
      } else {
        alert('Error al realizar la reserva');
      }
    } catch (error) {
      alert('Error al realizar la reserva');
      console.error('Error al realizar la reserva:', error);
    }
  };

  return (
    <div className="p-4 text-white min-h-screen font-clear">
      <Hero />
      <Calendario onDateChange={setFecha} selectedDate={fecha} />
      <SelectCancha onCanchaChange={setCancha} />
      {cancha && fecha && (
        <>
          <SelectorHorario
            fecha={fecha}
            cancha={cancha}
            onHorarioSeleccionado={setHorarioSeleccionado}  // Capturamos el horario seleccionado
          />
          <div className="mt-4 text-black">
            <input
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="border p-2 w-full mb-2"
            />
            <p className="mb-2">Total: ${total}</p>
            <button onClick={handleReserva} className="bg-blue-500 text-white py-2 px-4 rounded">
              Confirmar Reserva
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Reservar;
