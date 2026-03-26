const express=require("express");
const app=express();
require("dotenv").config();
app.use(express.json());

const PORT=process.env.PORT; //db connection
const dbConnection=require("./connection/userConnection");
dbConnection(process.env.MONGO_URl);

const testRouter=require("./routes/testRoute")
app.use("/api",testRouter)

const imageRoute = require("./routes/imageRoute");
app.use("/api", imageRoute);


app.listen(PORT,()=>console.log(`Server started at PORT ${PORT}`));