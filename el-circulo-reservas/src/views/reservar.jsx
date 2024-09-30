import React, { useState, useEffect } from 'react';
import SelectCancha from '../components/selectCancha';
import SelectorHorario from '../components/selectHorario';
import Calendario from '../components/calendar';
import { crearReserva } from '../supabase/api';
import Hero from '../components/Hero';
import { devolverPrecio } from '../supabase/api';  // Importamos la nueva función
import axios from 'axios';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
initMercadoPago('APP_USR-58eeb5bd-e9ee-4df7-9367-45fd7cd59738', {locale:"es-AR"});


const Reservar = () => {
  const [fecha, setFecha] = useState(null);
  const [cancha, setCancha] = useState('');
  const [horarioSeleccionado, setHorarioSeleccionado] = useState('');  // Capturamos el horario seleccionado
  const [preferenceId,setPreferenceId] = useState(null);
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

  
  const createPreference = async () => {
    try {
      const response = await axios.post("http://localhost3000/create_preference",{
      title:`Reserva de cancha de ${cancha}, Fecha: ${fecha} Turno: ${horarioSeleccionado}`,
      quantity:1,
      price:{total},
    });
    const {id} = response.data
    return id;
  } catch (error) {
    console.log(error)
  }
}

const handleBuy = async () => {
  const id = await createPreference();
  if (id){
    setPreferenceId(id);
  }
};


  return (
    <div>
    <Hero />
    <div className="p-4 text-white min-h-screen font-clear">
      {/* Contenedor principal que divide el contenido en columnas en pantallas xl */}
      <div className="flex flex-col xl:flex-row xl:justify-between items-center xl:space-x-8">
        {/* Calendario a la izquierda con mismo tamaño que la columna derecha */}
        <div className="flex-none xl:w-1/2 flex justify-center mb-8 xl:mb-0">
          <Calendario onDateChange={setFecha} selectedDate={fecha} />
        </div>
  
        {/* Contenedor a la derecha con el resto del contenido */}
        <div className="flex-grow xl:w-1/2 flex justify-center">
          <div className="flex flex-col items-center w-full xl:w-[400px]">
            <SelectCancha onCanchaChange={setCancha} />
            
            {cancha && fecha && (
              <div className="flex flex-col items-center">
                <SelectorHorario
                  fecha={fecha}
                  cancha={cancha}
                  onHorarioSeleccionado={setHorarioSeleccionado} // Capturamos el horario seleccionado
                />
                
                {/* Sección del formulario de reserva */}
                <div className="mt-4 flex flex-col items-center">
                  <input
                    type="text"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className="border p-2 w-full mb-2 bg-zinc-800 text-white rounded-sm"
                  />
                  <p className="m-4 text-center text-xl">Total: ${total}</p>
  
                  <button
                    onClick={handleReserva}
                    className="bg-blue-500 text-white py-2 px-4 rounded"
                  >
                    Confirmar Reserva
                  </button>
  
                  {preferenceId && (
                    <Wallet
                      initialization={{ preferenceId: '<PREFERENCE_ID>' }}
                      customization={{ texts: { valueProp: 'smart_option' } }}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default Reservar;
