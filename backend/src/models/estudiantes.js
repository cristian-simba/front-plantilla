import mongoose from 'mongoose'

const estudiantesSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nombre : {type : String, require : true, trim : true},
    cedula : { type : Number, require : true, unique : true, trim : true},
    email : { type : String, require : true, unique : true, trim : true},
    carrera : {type : String, require : true, trim : true}
})

export default mongoose.model('Estudiante', estudiantesSchema)