import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DeleteModal from "../Modals/DeleteModal";
import Search from "../Search";
import AddRecordButton from "../AddRecordButton";

const TablaEstudiantes = () => {
    const [estudiantes, setEstudiantes] = useState([]);
    const [originalEstudiantes, setOriginalEstudiantes] = useState([]);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [estudiantesPerPage] = useState(6);

    useEffect(() => {
        const obtenerEstudiantes = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/estudiantes/listar`);
                setEstudiantes(response.data);
                setOriginalEstudiantes(response.data); // Almacenar los estudiantes originales
            } catch (error) {
                console.log("Error al obtener estudiantes", error);
            }
        };
        obtenerEstudiantes();
    }, []);

    const eliminarEstudiante = async (estudianteId) => {
        try{
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/estudiantes/eliminar/${estudianteId}`)
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/estudiantes/listar`);
            setEstudiantes(response.data);
            setOriginalEstudiantes(response.data); // Actualizar los estudiantes originales después de eliminar un estudiante
        }catch(error){
            console.log(error)
        }
    }

    const buscador = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        setSearch(searchTerm);
        if (searchTerm === "") {
            setEstudiantes(originalEstudiantes); // Restaurar los estudiantes originales cuando el término de búsqueda está vacío
        } else {
            const filteredEstudiantes = originalEstudiantes.filter((estudiante) => {
                return (
                    estudiante.nombre.toLowerCase().includes(searchTerm) ||
                    estudiante.email.toLowerCase().includes(searchTerm) ||
                    estudiante.carrera.toLowerCase().includes(searchTerm) ||
                    estudiante.cedula.toString().includes(searchTerm)
                );
            });
            setEstudiantes(filteredEstudiantes);
        }
    }

    // Paginación
    const indexOfLastEstudiante = currentPage * estudiantesPerPage;
    const indexOfFirstEstudiante = indexOfLastEstudiante - estudiantesPerPage;
    const currentEstudiantes = [];
    
    for (let i = indexOfFirstEstudiante; i < indexOfLastEstudiante && i < estudiantes.length; i++) {
        currentEstudiantes.push(estudiantes[i]);
    }
    

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <div className="flex flex-row justify-between">
                <div className="flex-grow">
                    <Search searchValue={search} onSearch={buscador} />
                </div>
                    <AddRecordButton text="estudiantes" to="/dashboard/estudiantes/agregar-estudiante" />
            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Nombre del estudiante</th>
                            <th scope="col" className="px-6 py-3">Cédula</th>
                            <th scope="col" className="px-6 py-3">Correo electrónico</th>
                            <th scope="col" className="px-6 py-3">Carrera</th>
                            <th scope="col" className="px-6 py-3">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                    {currentEstudiantes && currentEstudiantes.length > 0 ? (
                        currentEstudiantes.map((estudiante) => (
                            <tr key={estudiante._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{estudiante.nombre}</td>
                            <td className="px-6 py-4">{estudiante.cedula}</td>
                            <td className="px-6 py-4">{estudiante.email}</td>
                            <td className="px-6 py-4">{estudiante.carrera}</td>
                            <td className="flex items-center px-6 py-4">
                                <Link to={`/dashboard/estudiantes/actualizar-estudiante/${estudiante._id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                Editar
                                </Link>
                                <DeleteModal
                                className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                                text={"estudiante"}
                                deleteFunction={() => eliminarEstudiante(estudiante._id)}
                                />
                            </td>
                            </tr>
                        ))
                        ) : (
                        <tr>
                            <td colSpan="5" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">No existen registros de estudiantes</td>
                        </tr>
                        )}

                    </tbody>
                </table>
            </div>
            {/* Paginación */}
            <div className="mt-3 flex justify-center">
                {estudiantes.length > estudiantesPerPage && (
                    <ul className="flex list-none">
                        {Array.from({ length: Math.ceil(estudiantes.length / estudiantesPerPage) }).map((_, index) => (
                            <li key={index} className="px-2 ">
                                <button
                                    className={`bg-gray-200 rounded-md w-6 text-gray-500 hover:underline focus:outline-none ${currentPage === index + 1 ? 'font-semibold text-blue-500' : ''}`}
                                    onClick={() => paginate(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
}

export default TablaEstudiantes;
