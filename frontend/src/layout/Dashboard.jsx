import React, { useState, useEffect } from 'react';
import Sidebar, { SidebarItem } from "../components/Sidebar";
import { UsersRound, Notebook, SquarePen } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";
import NotAuthorized from '../pages/NotAuthorized';

const Dashboard = () => {
  const [selectedItem, setSelectedItem] = useState('/dashboard/estudiantes');
  const { state: locationState, } = useLocation();
  const [logged, setLogged] = useState(false); // Estado de autenticación
  const [renderNotAuthorized, setRenderNotAuthorized] = useState(false);

  // Verificar el estado de autenticación al cargar el componente
  useEffect(() => {
    const isUserLogged = localStorage.getItem('logged');
    if (isUserLogged === 'true') {
      setLogged(true);
    } else {
      setTimeout(() => {
        setRenderNotAuthorized(true);
      }, 500); // Renderizar NotAuthorized después de 1 segundo
    }
  }, []);

  // Verificar si la ubicación actual es la misma que el item seleccionado
  const isItemSelected = (item) => {
    return locationState?.pathname === item;
  };

  // Manejar el clic en un item del sidebar
  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <>
      {logged ? (
        <div className="flex">
          <Sidebar>
            <Link to="/dashboard/estudiantes">
              <SidebarItem
                icon={<UsersRound size={20} />}
                text="Estudiantes"
                active={isItemSelected('/dashboard/estudiantes')}
                onClick={() => handleItemClick('/dashboard/estudiantes')}
              />
            </Link>
            <Link to="/dashboard/materias">
              <SidebarItem
                icon={<Notebook size={20} />}
                text="Materias"
                active={isItemSelected('/dashboard/materias')}
                onClick={() => handleItemClick('/dashboard/materias')}
              />
            </Link>
            <Link to="/dashboard/matriculas">
              <SidebarItem
                icon={<SquarePen size={20} />}
                text="Matrículas"
                active={isItemSelected('/dashboard/matriculas')}
                onClick={() => handleItemClick('/dashboard/matriculas')}
              />
            </Link>
          </Sidebar>
          <div className="flex-grow">
            <Outlet />
          </div>
        </div>
      ) : (
        // Renderizar el componente NotAuthorized después de 1 segundo
        renderNotAuthorized && <NotAuthorized />
      )}
    </>
  );
};

export default Dashboard;
