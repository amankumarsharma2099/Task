import express  from "express"
import cors from 'cors'
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config'
import taskRouter from "./routes/taskRoute.js";
import dashboardRouter from "./routes/dashboardRoutes.js";

// app config
const app = express()
const port = process.env.PORT || 4000;

// middlewares
app.use(express.json())
app.use(cors())

// db connection
connectDB()

// api endpoints
app.use("/api/user", userRouter)
app.use('/api/tasks', taskRouter);
app.use('/api/dashboard', dashboardRouter);

app.get("/", (req, res) => {
    res.send("API Working")
  });


app.listen(port, () => console.log(`Server started on http://localhost:${port}`))

// 3:46:24
// npm run server
// food model i am not creating 3:47  
// file storage using multer 3:59
// 6:4:14 
// 6:23:34 integrating backend in frontend
// 6:48:30 logout
// 7:07:33  auth.js middleware