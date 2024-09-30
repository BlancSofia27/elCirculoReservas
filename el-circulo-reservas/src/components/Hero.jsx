import React from 'react';
import logo from '../assets/elCirculoLogo.jpg';
import tennisBackgroundXL from '../assets/headerXl.png'; // Imagen para pantallas xl
import tennisBackgroundXS from '../assets/headerXs.png'; // Imagen para pantallas xs

const Hero = () => {
  return (
    <div className="relative flex flex-col items-center justify-center xl:h-[500px] xs:h-[300px]">
      {/* Imagen de fondo para pantallas xl */}
      <img
        src={tennisBackgroundXL}
        alt="Tenis background XL"
        className="absolute inset-0 w-full h-[500px] object-cover opacity-50 hidden xl:block lg:block"
      />

      {/* Imagen de fondo para pantallas xs */}
      <img
        src={tennisBackgroundXS}
        alt="Tenis background XS"
        className="absolute inset-0 w-full h-[300px] object-cover opacity-50 block xl:hidden lg:hidden"
      />

      {/* Contenedor para centrar logo y texto */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center">
        {/* Contenido del logo por encima del header */}
        <div className="rounded-full overflow-hidden w-48 h-48 flex items-center justify-center shadow-lg">
          <img 
            src={logo} 
            alt="logo El circulo"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Texto debajo del logo */}
        <h2 className="my-4 text-xl font-light">Realiza tu reserva</h2>
      </div>
    </div>
  );
};

export default Hero;
