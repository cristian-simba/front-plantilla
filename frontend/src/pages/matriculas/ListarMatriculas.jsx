import Search from "../../components/Search"
import AddRecordButton from "../../components/AddRecordButton"
import TablaMatriculas from "../../components/Tablas/TablaMatriculas"

const ListarMatriculas = () => {
    return (
        <div className="p-5 flex flex-col">
        <h1 className=" text-2xl font-bold mb-4">Módulo de Matículas</h1>
        <span className="font-medium text-gray-500 mb-8">Revisa las matrículas .. no tengo ideas xD</span>
        <div className="flex flex-row justify-between">
            <div className="flex-grow">
                <Search/>
            </div>
            <AddRecordButton text="matrícula" to="/dashboard/matriculas/agregar-matricula" />
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between">
            <div className="lg:w-full sm:w-1/2">
                <TablaMatriculas/>
            </div>
        </div>
    </div>
    );
};

export default ListarMatriculas;
