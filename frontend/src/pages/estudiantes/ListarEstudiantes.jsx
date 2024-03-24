import TablaEstudiantes from "../../components/Tablas/TablaEstudiantes"
import Search from "../../components/Search"
import AddRecordButton from "../../components/AddRecordButton"
import { useState } from "react"

const ListarEstudiantes = () => {

    const [estudiante, setEstudiantes] = useState([])

    

    return(
        <>
            <div className="p-5 flex flex-col">
                <h1 className=" text-2xl font-bold mb-4">Módulo de Estudiantes</h1>
                <span className="font-medium text-gray-500 mb-8">Revisa los estudiantes .. no tengo ideas xD</span>

                <div className="flex flex-col sm:flex-row sm:justify-between">
                    <div className="lg:w-full sm:w-1/2">
                        <TablaEstudiantes />         
                    </div>
                </div>
            </div>
        </>
    )
}

export default ListarEstudiantes