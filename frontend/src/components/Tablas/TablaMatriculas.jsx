import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DeleteModal from '../Modals/DeleteModal'

const TablaMatriculas = () => {
    const [matriculas, setMatriculas] = useState([])

    useEffect(()=>{
        const obtenerMatriculas = async () => {
            try{
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/matriculas/listar`);
                setMatriculas(response.data)
            }catch(error){
                console.log(error)
            }
        }
        obtenerMatriculas()
    },[])

    const eliminarMatricula = async(matriculaID) => {
        try{
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/matriculas/eliminar/${matriculaID}`)
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/matriculas/listar`);
            setMatriculas(response.data)
        }catch(error){
            console.log(error)
        }
    }

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">Nombre de la materia</th>
                    <th scope="col" className="px-6 py-3">Estudiante registrado</th>
                    <th scope="col" className="px-6 py-3">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {matriculas && matriculas.length > 0 ? (
                    matriculas.map((matricula) => (
                        <tr key={matricula._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{matricula.nombreMateria}</td>
                            <td className="px-6 py-4">{matricula.estudiante}</td>
                            <td className="flex items-center px-6 py-4">
                                <Link to={`/dashboard/matriculas/actualizar-matricula/${matricula._id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                    Editar
                                </Link>
                                <DeleteModal
                                className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                                text={"matricula"}
                                deleteFunction={()=>eliminarMatricula(matricula._id)}
                                />
                            </td>
                        </tr>
                    ))
                ):(
                    <tr>
                        <td colSpan="5" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">No existen registros de matrículas</td>
                    </tr>
                )}

            </tbody>
        </table>
    </div>
    )
}

export default TablaMatriculas