import mongoose from "mongoose";
const connectDB = async () =>{
    try {
        const conn =  await mongoose.connect(process.env.MONGO_URL)
        console.log(`mongo connected: ${conn.connection.host}`.cyan.underline)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
// MONGO_URL = mongodb://127.0.0.1:27017/TourApp/

// module.exports = connectDB
export default connectDB