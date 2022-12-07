import mongoose from "mongoose";
import bcrypt from "bcrypt"

const usuarioSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    rank:{
        type: Number,
        trim: true,
        default: 0
    },
    favoritos:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Clothes"
    }],
    password:{
        type: String,
        required: true,
        trim: true
    },
},{ timestamps: true})

usuarioSchema.pre("save",async function (next){
    if(!this.isModified("password")){
        next()
    }
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password,salt)
})

usuarioSchema.methods.comprobarPassword = async function (passwordFormulario) {
    return await bcrypt.compare(passwordFormulario,this.password)
}

const Usuario = mongoose.model("Usuario",usuarioSchema)
export default Usuario