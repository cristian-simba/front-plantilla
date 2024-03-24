import mongoose from "mongoose";

const materiasSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nombremateria : {type : String, require : true, unique : true, trim : true},
    codigo : {type : String, require : true, unique : true, trim : true},
    creditos : {type : Number, require : true, trim : true}
})

export default mongoose.model('Materia', materiasSchema)