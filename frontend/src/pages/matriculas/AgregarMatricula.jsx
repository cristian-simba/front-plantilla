import React from 'react'
import FomularioMatricula from '../../components/Forms/FomularioMatricula'


const AgregarMatricula = () => {
  return (
    <div className="p-5 flex flex-col h-screnn">
        <h1 className=" text-2xl font-bold mb-4">Registar Matriculas</h1>
        <span className="font-medium text-gray-500 mb-8">Registra una matricula</span>
        <FomularioMatricula textBtn={"Registrar matricula"}/>
    </div>
  )
}

export default AgregarMatricula