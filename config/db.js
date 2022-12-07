import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log(`DB on ${connect.connection.host}:${connect.connection.port}` )

    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

export default connectDB