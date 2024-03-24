import FormularioMateria from "../../components/Forms/FormularioMateria"

const AgregarMateria = () => {
    return(
        <>
            <div className="p-5 flex flex-col h-screnn">
                <h1 className=" text-2xl font-bold mb-4">Agregar Materias</h1>
                <span className="font-medium text-gray-500 mb-8">Agrega una materia más a la lista</span>
                <FormularioMateria textBtn={"Registrar materia"}/>
            </div>
        </>
    )
}
export default AgregarMateria