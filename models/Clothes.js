import mongoose from "mongoose";

const clothesSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: true,
        trim: true
    },
    dir:{
        type: String,
        required: true,
        trim: true
    },
    descripcion:{
        type: String,
        required: true,
        trim: true
    },
    categoria:{
        type: String,
        required: true,
        trim: true
    },
    disponibles:{
        type: Number,
        required: true,
        trim: true
    },
    precio:{
        type: Number,
        required: true,
        trim: true
    }


},{ timestamps: true})

const Clothes = mongoose.model("Clothes",clothesSchema)
export default Clothes