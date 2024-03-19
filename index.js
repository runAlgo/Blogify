// require('dotenv').config({path: './env'})
const dotenv = require("dotenv");
const connectDB = require("./db/index.js");


dotenv.config({
    path: './env'
})
connectDB()









// const mongoose = require("mongoose");
// const { DB_NAME } = require("./constants")
// ( async () => {
//     try {
//        await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`)
//     } catch (error) {
//         console.error("ERROR", error)
//         throw err
//     }
// })()