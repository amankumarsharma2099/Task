import mongoose from "mongoose";

export const  connectDB = async () =>{

    await mongoose.connect('mongodb+srv://amankumarsharma2099:1234@amanstoreecommerce.wlvcdgn.mongodb.net/task-manage').then(()=>console.log("DB Connected"))
   
}


// add your mongoDB connection string above.
// Do not use '@' symbol in your databse user's password else it will show an error.