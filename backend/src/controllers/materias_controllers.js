import Materias from "../models/materias.js";
import mongoose from "mongoose";

const mostrarMaterias = async (req, res) => {
    try{
        const materias = await Materias.find()
        if (!materias || materias.length === 0) {
            return res.json({ message: 'No existen registros de materias' });
        }
        res.status(200).json(materias)
    }catch(err){
        res.status(500).json({ error: 'Error al obtener las materias' });
        console.log(err)
    }
}

const buscarMaterias = async(req, res) => {
    const materiaID = req.params.id
    try{
        const materia = await Materias.findById(materiaID)
        if(!materia){
            res.status(404).json({ message : 'No existe esa materia'})
        }else{
            res.status(200).json(materia)
        }
    }catch(error){
        console.log(error)
        res.status(500).json({ error: 'Error al obtener la materia' });
    }
}

const registrarMaterias = async (req, res) => {
    const {nombremateria, codigo, creditos} = req.body
    try{
        const exisMateria = await Materias.findOne({nombremateria})
        const exisCodigo = await Materias.findOne({codigo})
        if (exisMateria || exisCodigo){
            if (exisMateria && exisCodigo) return res.status(200).json({message : 'Materia y código de materia ya registrados'})
            else if (exisMateria) return res.status(200).json({message : 'Materia ya registrada'})
            else if (exisCodigo) return res.status(200).json({message : 'Código de materia ya registrada'})
        }else{
            const nuevaMateria = new Materias({
                _id: new mongoose.Types.ObjectId(),
                nombremateria,
                codigo,
                creditos
            })
            await nuevaMateria.save();
            res.status(200).json({message : "Materia registrada con exito", materia : nuevaMateria})
        }
    }catch(err){
        res.status(500).json({message : "Error al registrar la materia"})
        console.log(err)
    }
}

const actualizarMaterias = async (req, res) => {
    const materiaID = req.params.id
    try {
      const materiaActualizada = await Materias.findByIdAndUpdate(materiaID, req.body, {new: true})
      if (!materiaActualizada) return res.status(404).json({ message: "No se encontró la materia para actualizar" });
      res.status(200).json({ message: "Materia actualizada", materia : materiaActualizada });
    } catch (err) {
      res.status(500).json({ message: "Error al actualizar la materia" });
      console.log(err);
    }
}

const borrarMaterias = async (req, res) => {
    const materiaID = req.params.id
    try{
        const materiaEliminada = await Materias.findByIdAndDelete(materiaID)
        if(!materiaEliminada){res.status(404).json({message : "No se encontro la materia para eliminar"})}
        res.status(200).json({message : "Materia eliminada"})
    }catch(err){
        res.status(500).json({message : "Error al eliminar la materia"})
        console.log(err)
    }
}

export {
    mostrarMaterias,
    buscarMaterias,
    registrarMaterias,
    actualizarMaterias,
    borrarMaterias
}