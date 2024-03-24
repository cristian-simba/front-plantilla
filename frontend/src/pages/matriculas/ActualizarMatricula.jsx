import React from 'react'
import { useParams } from 'react-router-dom'
import FomularioMatricula from '../../components/Forms/FomularioMatricula'

const ActualizarMatricula = () => {
    const {id} = useParams()

    return (
        <div className="p-5 flex flex-col h-screen">
            <h1 className="text-2xl font-bold mb-4">Actualizar Materias</h1>
            <span className="font-medium text-gray-500 mb-8">Actualiza la información de una materia</span>
            <FomularioMatricula matriculaID={id} textBtn={"Actualizar matricula"}/>
        </div>
    )
}

export default ActualizarMatricula