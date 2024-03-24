import Estudiante from "../models/estudiantes.js";
import mongoose from "mongoose";

const mostrarEstudiantes = async (req, res) => {
    try {
      const estudiantes = await Estudiante.find();
      if(!estudiantes || estudiantes.length === 0){
        res.status(200).json({message : "No existen registros de estudiantes"})
      }else{
        res.status(200).json(estudiantes);
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los estudiantes' });
      console.log(error);
    }
}

const buscarEstudiantes = async (req, res) => {
    const estudianteID = req.params.id
    try {
      const estudiantes = await Estudiante.findById(estudianteID);
      if (!estudiantes) {
        res.status(404).json({ message: 'No existe ese estudiante' });
      } else {
        res.status(200).json(estudiantes);
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los estudiantes' });
      console.log(error);
    }
}

const registrarEstudiante = async (req, res) => {
    const { nombre, cedula, email, carrera } = req.body;
    try {
        const exisEstudiante = await Estudiante.findOne({cedula})
        const exisCorreo = await Estudiante.findOne({email})
        if (exisEstudiante || exisCorreo){
          if (exisEstudiante && exisCorreo) return res.status(200).json({message : 'Ya existe un estudiante con ese correo y cedula'})
          else if (exisCorreo) return res.status(200).json({message : 'Ya existe un estudiante con ese correo'})
          else if (exisEstudiante) return res.status(200).json({message : 'Ya existe un estudiante con esa cedula'})
        }else{
          const nuevoEstudiante = new Estudiante({
              _id: new mongoose.Types.ObjectId(), 
              nombre,
              cedula,
              email,
              carrera
          });
          await nuevoEstudiante.save();
          res.status(200).json({ message: 'Estudiante registrado' , estudiante : nuevoEstudiante});
        }
    } catch (err) {
        res.status(500).json({ error: 'Error al registrar el estudiante' });
        console.log(err);
    }
}

const actualizarEstudiante = async (req, res) => {
    const estudianteID = req.params.id; 
    try {
        const estudianteActualizado = await Estudiante.findByIdAndUpdate(estudianteID, req.body, { new: true });
        if (!estudianteActualizado) {
            return res.status(404).json({ error: 'No se encontró el estudiante para actualizar' });
        }
        res.status(200).json({ message: 'Estudiante actualizado', estudiante: estudianteActualizado });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el estudiante' });
        console.log(error);
    }
}

const borrarEstudiante = async (req, res) => {
    const estudianteID = req.params.id;
    try {
      const estudianteEliminado = await Estudiante.findByIdAndDelete(estudianteID);
      if (!estudianteEliminado) {
        return res.status(404).json({ error: 'No se encontró el estudiante para eliminar' });
      }
      res.status(200).json({ message: 'Estudiante eliminado' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar el estudiante' });
      console.log(error);
    }
}

export {
    mostrarEstudiantes,
    buscarEstudiantes,
    registrarEstudiante,
    actualizarEstudiante,
    borrarEstudiante
}