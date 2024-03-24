import Search from "../../components/Search"
import AddRecordButton from "../../components/AddRecordButton"
import TablaMaterias from "../../components/Tablas/TablaMaterias"

const ListarMaterias = () => {
    return(
        <>
            <div className="p-5 flex flex-col">
                <h1 className=" text-2xl font-bold mb-4">Módulo de Materias</h1>
                <span className="font-medium text-gray-500 mb-8">Revisa los estudiantes .. no tengo ideas xD</span>
                <div className="flex flex-row justify-between">
                    <div className="flex-grow">
                        <Search/>
                    </div>
                    <AddRecordButton text="materias" to="/dashboard/materias/agregar-materia" />
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between">
                    <div className="lg:w-full sm:w-1/2">
                        <TablaMaterias/>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ListarMaterias