import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FormularioEstudiante = ({ estudianteId, textBtn}) => {
    const navigate = useNavigate()
    const [mensaje, setMensaje] = useState('')

    const [form, setForm] = useState({
        nombre: "",
        cedula: "",
        email: "",
        carrera: "",
    });



    useEffect(() => {
        const obtenerEstudiante = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/estudiantes/obtener/${estudianteId}`);
                const estudiante = response.data;
                setForm({
                    nombre: estudiante.nombre ?? "",
                    cedula: estudiante.cedula ?? "",
                    email: estudiante.email ?? "",
                    carrera: estudiante.carrera ?? "",
                });
            } catch (error) {
                console.error("Error al obtener estudiante:", error);
            }
        };

        if (estudianteId) {
            obtenerEstudiante();
        }
    }, [estudianteId]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response;
            if (estudianteId) {
                response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/estudiantes/actualizar/${estudianteId}`, form);
                console.log("Actualizacion exitosa")
            } else {
                response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/estudiantes/register`, form);
                console.log(response.data.message)

                if(response.data.message === "Estudiante registrado"){
                    console.log("Registro exitoso")
                    navigate('/dashboard/estudiantes')
                }else{
                    setMensaje(response.data.message)
                    notify()
                }
                
            }
            if (response.status === 201 || response.status === 200) {
                console.log("Estudiante guardado:", response.data);
                
            }
        } catch (error) {
            console.error("Error al guardar estudiante:", error);
        }
    };

    const notify = () => {
        toast.info(mensaje)
    }


    return (
        <div className="grid grid-cols-3 gap-4">
            <ToastContainer />
            <form onSubmit={handleSubmit} className="col-span-3">
                <div className="flex flex-col space-y-4">
                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-900 dark:text-white">Nombre completo del estudiante</label>
                    <input
                        type="text"
                        id="nombre"
                        className="bg-gray-50 focus:outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Ingrese el nombre completo del estudiante"
                        required
                        name="nombre"
                        onChange={handleChange}
                        value={form.nombre}
                    />

                    <div className="flex flex-col md:flex-row md:space-x-4">
                        <div className="flex-2">
                            <label htmlFor="cedula" className="block mb-3 text-sm font-medium text-gray-900 dark:text-white">Cédula</label>
                            <input
                                type="text"
                                id="cedula"
                                className="bg-gray-50 focus:outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Ingrese la cédula"
                                required
                                name="cedula"
                                onChange={handleChange}
                                value={form.cedula}
                                
                            />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="email" className="block mb-3 text-sm font-medium text-gray-900 dark:text-white">Correo Electrónico</label>
                            <input
                                type="email"
                                id="email"
                                className="bg-gray-50 focus:outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Ingrese el correo"
                                required
                                name="email"
                                onChange={handleChange}
                                value={form.email}
                            />
                        </div>
                    </div>
                    <label htmlFor="carrera" className="block text-sm font-medium text-gray-900 dark:text-white">Carrera que se encuentra cursando</label>
                    <input
                        type="text"
                        id="carrera"
                        className="bg-gray-50 focus:outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Ingrese la carrera"
                        required
                        name="carrera"
                        onChange={handleChange}
                        value={form.carrera}
                    />
                </div>
                <button
                    type="submit"
                    className="text-white mt-6 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-50 font-medium rounded-lg text-sm sm:w-1/2 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    {textBtn}
                </button>
            </form>
        </div>
    );
}

export default FormularioEstudiante;
