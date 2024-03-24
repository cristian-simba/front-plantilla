import { useParams } from "react-router-dom";
import FormularioEstudiante from "../../components/Forms/FormularioEstudiante";

const ActualizarEstudiante = () => {
    const { id } = useParams();
    console.log("ID del estudiante:", id); 

    return(
        <>
            <div className="p-5 flex flex-col h-screen">
                <h1 className="text-2xl font-bold mb-4">Actualizar Estudiantes</h1>
                <span className="font-medium text-gray-500 mb-8">Actualiza la información de un estudiante</span>
                <FormularioEstudiante estudianteId={id} textBtn={'Actualizar datos del estudiante'}/>
            </div>
        </>
    );
};

export default ActualizarEstudiante;
