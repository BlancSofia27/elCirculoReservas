import React from 'react';
import AdminReservasTable from '../components/reservasTable';

const AdminPanel = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Panel de Administración</h1>
      

      {/* Tabla de Reservas */}
      <AdminReservasTable />
    </div>
  );
};

export default AdminPanel;
