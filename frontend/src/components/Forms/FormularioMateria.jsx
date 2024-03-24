import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const FormularioMateria = ({materiaID, textBtn}) => {
    const navigate = useNavigate()

    const [form, setForm] = useState({
        nombremateria: "",
        codigo: "",
        creditos: ""
    })

    useEffect(()=>{
        const obtenerMateria = async() => {
            try{
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/materias/obtener/${materiaID}`)
                const materia = response.data
                setForm({
                    nombremateria: materia.nombremateria ?? "",
                    codigo: materia.codigo ?? "",
                    creditos: materia.creditos ?? ""
                })
            } catch(error){
                console.log("Error al obtener la materia")
                console.log(error)
            }
        }
        if(materiaID){
            obtenerMateria()
        }
    },[materiaID])
    
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        try{
            let response
            if(materiaID){
                response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/materias/actualizar/${materiaID}`, form)
                console.log("actualizacion exitosa")
            }else{
                response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/materias/register`, form)
                console.log("registro exitoso")
            }
            if(response.status == 200 || response.status == 201){
                navigate('/dashboard/materias')
            }
        }catch(error){
            console.log(error)
        }
    }

    return(
        <>
        <div className="grid grid-cols-3 gap-4">
            <form onSubmit={handleSubmit} className="col-span-3">
                <div className="flex flex-col space-y-4">
                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-900 dark:text-white">Nombre de la materia</label>
                    <input
                        type="text"
                        id="nombremateria"
                        className="bg-gray-50 focus:outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Ingrese el nombre completo de la materia"
                        required
                        name="nombremateria"
                        onChange={handleChange}
                        value={form.nombremateria}
                    />

                    <div className="flex flex-col md:flex-row md:space-x-4">
                        <div className="flex-2">
                            <label htmlFor="codigo" className="block mb-3 text-sm font-medium text-gray-900 dark:text-white">Código</label>
                            <input
                                type="text"
                                id="codigo"
                                className="bg-gray-50 focus:outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Ingrese el código"
                                required
                                name="codigo"
                                onChange={handleChange}
                                value={form.codigo}
                            />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="creditos" className="block mb-3 text-sm font-medium text-gray-900 dark:text-white">Créditos</label>
                            <input
                                type="text"
                                id="creditos"
                                className="bg-gray-50 focus:outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Ingrese los números de créditos correspondientes a la materia"
                                required
                                name="creditos"
                                onChange={handleChange}
                                value={form.creditos}
                            />
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
        </>
    )
}

export default FormularioMateria