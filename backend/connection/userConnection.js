const mongoose=require("mongoose");
const dbConnection=(url)=>{
    mongoose
    .connect(url)
    .then(()=>console.log("DATABASE connected successfully"))
    .catch((err)=>console.log("Error occured:",err.message))
}
module.exports=dbConnection;