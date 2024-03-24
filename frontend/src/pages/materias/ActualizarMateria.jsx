import { useParams } from "react-router-dom"
import FormularioMateria from "../../components/Forms/FormularioMateria"

const ActualizarMateria = () =>{
    const {id} = useParams()

    return(
        <>
        <div className="p-5 flex flex-col h-screen">
            <h1 className="text-2xl font-bold mb-4">Actualizar Materias</h1>
            <span className="font-medium text-gray-500 mb-8">Actualiza la información de una materia</span>
            <FormularioMateria materiaID={id} textBtn={'Actualizar datos de la materia'}/>
        </div>
    </>
    )
}
export default ActualizarMateria