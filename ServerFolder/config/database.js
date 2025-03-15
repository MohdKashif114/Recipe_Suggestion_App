
import mongoose from "mongoose"
import dotenv from "dotenv";

dotenv.config();
console.log(`The mongo url is ${process.env.DATABASE_URL} `)
const DBconnect=()=>{
    mongoose.connect(process.env.DATABASE_URL,{})
    .then(()=>console.log("Connection to database is successful"))
    .catch((error)=>{
        console.log("Issue in DB connection");
        console.error(error.message);
        process.exit(1);
    });
}



export default DBconnect;
