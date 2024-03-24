import {Link} from 'react-router-dom'
import DeleteModal from '../Modals/DeleteModal'
import { useEffect, useState } from 'react'
import axios from 'axios'

const TablaMaterias = () =>{

    const [materias, setMaterias] = useState([])
    
    useEffect(()=>{
        const obtenerMaterias = async() =>{
            try{
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/materias/listar`)
                setMaterias(response.data)
            }catch(error){
                console.log(error)
            }
        }
        obtenerMaterias()
    }, [])

    const eliminarMaterias = async(materiaID) => {
        try{
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/materias/eliminar/${materiaID}`)
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/materias/listar`)
            setMaterias(response.data)
        }catch(error){
            console.log(error)
        }
    }
    return(
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Código</th>
                            <th scope="col" className="px-6 py-3">Nombre de la materia</th>
                            <th scope="col" className="px-6 py-3">Créditos</th>
                            <th scope="col" className="px-6 py-3">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {materias && materias.length > 0 ? (
                            materias.map((materia) => (
                                <tr key={materia.codigo} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{materia.codigo}</td>
                                    <td className="px-6 py-4">{materia.nombremateria}</td>
                                    <td className="px-6 py-4">{materia.creditos}</td>
                                    <td className="flex items-center px-6 py-4">
                                        <Link to={`/dashboard/materias/actualizar-materia/${materia._id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                            Editar
                                        </Link>
                                        <DeleteModal
                                            className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                                            text={"materia"}
                                            deleteFunction={()=> eliminarMaterias(materia._id)}
                                        />
                                    </td>
                                </tr>
                            ))
                        ):(
                            <tr>
                                <td colSpan="5" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">No existen registros de materias</td>
                            </tr>
                        )}

                    </tbody>
                </table>
            </div>
        </>
    )
}

export default TablaMaterias