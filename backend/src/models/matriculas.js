import mongoose from "mongoose";

const matriculasSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  nombreMateria: {
    type: mongoose.Schema.Types.String,
    ref: "Materia",
    required: true,
    trim : true
  },
  estudiante: {
    type: mongoose.Schema.Types.String,
    ref: "Estudiante",
    required: true,
    trim : true
  }
});

export default mongoose.model("Matricula", matriculasSchema);