import Matricula from "../models/matriculas.js";
import Estudiante from "../models/estudiantes.js"
import Materias from "../models/materias.js";
import mongoose from "mongoose";

const mostrarMatriculas = async (req, res) => {
    try {
      const matriculas = await Matricula.find();
      if (!matriculas || matriculas.length === 0) {
        return res.json({ message: 'No existen registros de matriculas' });
      }
      res.status(200).json(matriculas);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener las matriculas" });
      console.log(error);
    }
}

const buscarMatriculas = async (req, res) => {
    const matriculaId = req.params.id;
    try {
      const matricula = await Matricula.findById(matriculaId);
      if (!matricula) {
        return res.status(404).json({ error: "No se encontró la matricula" });
      }else{
        res.status(200).json(matricula);
      }
    } catch (error) {
      res.status(500).json({ error: "Error al obtener la matricula" });
      console.log(error);
    }
}

const registrarMatricula = async (req, res) => {
    const { nombreMateria, estudiante } = req.body;
    try {
      const buscarEstudiante = await Estudiante.find({ nombreMateria });
    const buscarMateria = await Materias.find({ estudiante });
    let estudianteEncontrado = null;
    let MateriaEncontrada = null;
    for (let i = 0 ; i < buscarEstudiante.length ; i++){
      if(estudiante == buscarEstudiante[i].nombre){
        estudianteEncontrado = buscarEstudiante[i].nombre
        break
      }
    }
    for (let i = 0 ; i < buscarMateria.length ; i++){
      if(nombreMateria == buscarMateria[i].nombremateria){
        MateriaEncontrada = buscarMateria[i].nombremateria
        break
      }
    }
    if(estudianteEncontrado == null && MateriaEncontrada == null) return res.status(404).json({ message : 'No existe la materia y tampoco el estudiante'})
    else if(estudianteEncontrado==null) return res.status(404).json({ message : 'No existe ese estudiante'})
    else if(MateriaEncontrada==null) return res.status(404).json({ message : 'No existe esa materia'})
    else {
      const exisMateria = await Matricula.findOne({ nombreMateria })
      const exisEstudiante = await Matricula.findOne({ estudiante })
      if(exisEstudiante && exisMateria) return res.status(200).json({ message : 'El estudiante ya se encuentra matriculado en esa materia'})
      const nuevaMatricula = await Matricula.create({
        _id: new mongoose.Types.ObjectId(),
        nombreMateria,
        estudiante
      });
      res.status(201).json({ message: "Matricula creada", matricula : nuevaMatricula });
    }
    } catch (error) {
      res.status(500).json({ error: "Error al crear la matricula" });
      console.log(error);
    }
}

const actualizarMatricula = async (req, res) => {
  const matriculaId = req.params.id;
  const { nombreMateria, estudiante } = req.body;
  try {
    const buscarEstudiante = await Estudiante.find({ nombreMateria });
    const buscarMateria = await Materias.find({ estudiante });
    let estudianteEncontrado = null;
    let MateriaEncontrada = null;
    for (let i = 0 ; i < buscarEstudiante.length ; i++){
      if(estudiante == buscarEstudiante[i].nombre){
        estudianteEncontrado = buscarEstudiante[i].nombre
        break
      }
    }
    for (let i = 0 ; i < buscarMateria.length ; i++){
      if(nombreMateria == buscarMateria[i].nombremateria){
        MateriaEncontrada = buscarMateria[i].nombremateria
        break
      }
    }
    if (MateriaEncontrada == null && estudianteEncontrado == null) {
      return res.status(404).json({ message: 'No se puede actualizar porque no existe ese estudiante y tampoco la materia' });
    } else if (estudianteEncontrado == null) {
      return res.status(404).json({ message: 'No se puede actualizar porque no existe ese estudiante' });
    } else if (MateriaEncontrada == null) {
      return res.status(404).json({ message: 'No se puede actualizar porque no existe esa materia' });
    } else {
      const matriculaActualizada = await Matricula.findByIdAndUpdate(matriculaId, req.body, { new: true });
      if (!matriculaActualizada) return res.status(404).json({ error: "No se encontró la matrícula para actualizar" });
      res.status(200).json({ message: "Matrícula actualizada", matricula: matriculaActualizada });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la matrícula" });
    console.log(error);
  }
};

const borrarMatricula = async (req, res) => {
    const matriculaId = req.params.id;
    try {
      const matriculaEliminada = await Matricula.findByIdAndDelete(matriculaId);
      if (!matriculaEliminada) {
        return res
          .status(404)
          .json({ error: "No se encontró la matricula para eliminar" });
      }
      res.status(200).json({ message: "Matricula eliminada" });
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar la matricula" });
      console.log(error);
    }
}

export {
    mostrarMatriculas,
    buscarMatriculas,
    registrarMatricula,
    actualizarMatricula,
    borrarMatricula
}