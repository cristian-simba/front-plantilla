import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const FomularioMatricula = ({matriculaID, textBtn}) => {

    const navigate = useNavigate()
    const [form, setForm] = useState({
        nombreMateria: "",
        estudiante: ""
    })

    const [materias, setMaterias] = useState([])
    
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    
    useEffect(()=>{
        const obtenerMaterias = async() => {
            try{
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/materias/listar`)
                setMaterias(response.data)
            }catch(error){
                console.log(error)
            }
        }
        obtenerMaterias()   
    }, [])

    useEffect(() => {
        const obtenerMatricula = async() => {
            try{
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/matriculas/mostrar/${matriculaID}`)
                const matricula = response.data
                setForm({
                    estudiante: matricula.estudiante ?? "",
                    nombreMateria: matricula.nombreMateria ?? ""
                })
            }catch(error){
                console.log(error)
            }
        }
        if(matriculaID){
            obtenerMatricula()
        }
    },[matriculaID])

    const handleSubmit = async(e) => {
        e.preventDefault()
        try{
            let response
            if(matriculaID){
                response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/matriculas/actualizar/${matriculaID}`, form)
                console.log("actualizion exitosa")
            }else{
                response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/matriculas/register`, form)
                console.log("registro exitoso")
            }
            if(response.status == 201 || response.status == 200){
                navigate('/dashboard/matriculas')
            }
        }catch(error){
            console.log(form)
            console.log(error.data)
        }
    }

    return (
        <div className="grid grid-cols-3 gap-4">
        <form onSubmit={handleSubmit} className="col-span-3">
            <div className="flex flex-col space-y-4">
                <label htmlFor="estudiante" className="block text-sm font-medium text-gray-900 dark:text-white">Nombre del estudiante</label>
                <input
                    type="text"
                    id="estudiante"
                    className="bg-gray-50 focus:outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Ingrese el nombre completo del estudiante"
                    required
                    name="estudiante"
                    onChange={handleChange}
                    value={form.estudiante}
                />
                <div className="flex flex-col md:flex-row md:space-x-4">
                    <div className="flex-1">
                    <label htmlFor="materias" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Seleccione una materia</label>
                        <select
                            id="nombreMateria"
                            className="focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            name="nombreMateria" 
                            onChange={handleChange} 
                            value={form.nombreMateria}
                        >
                            <option>Materias Disponibles</option>
                            {materias && materias.length > 0 ? (
                                materias.map((materia) => (
                                    <option key={materia._id} value={materia.nombremateria}>
                                        {materia.nombremateria}
                                    </option>
                                ))
                            ) : (
                                <option disabled>No existen materias registradas</option>
                            )}
                        </select>

                    </div>
                </div>
            </div>
            <button
                type="submit"
                className="text-white mt-6 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-50 font-medium rounded-lg text-sm sm:w-1/2 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                {textBtn}
            </button>
        </form>
    </div>
    )
}

export default FomularioMatricula