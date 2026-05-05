import mongoose from "mongoose";
const dbConnection=(url)=>{
    mongoose
    .connect(url)
    .then(()=>console.log("DATABASE connected successfully"))
    .catch((err)=>console.log("Error occured:",err.message))
}
export default dbConnection;