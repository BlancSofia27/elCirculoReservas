import React from 'react';
import logo from '../assets/elCirculoLogo.jpg'
const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center my-6">
      <div className="rounded-full overflow-hidden  w-64 h-64 flex items-center justify-center">
        <img 
          src={logo} 
          alt="logo El circulo"
          className="w-full h-full object-cover"
        />
      </div>
        <h2 className='my-4 text-xl'>Realiza tu reserva</h2>
    </div>
  );
};

export default Hero;
