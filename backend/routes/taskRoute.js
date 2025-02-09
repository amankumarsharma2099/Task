import express from 'express';
import { createTask, updateTask, getTasks, deleteTaskById } from '../controllers/taskController.js';
// import { validateTask } from '../middlewares/validateTask.js';
import authMiddleware from '../middleware/auth.js';
import validateTask from '../middleware/validateTask.js';

const taskRouter = express.Router();

taskRouter.post('/newtask', validateTask, createTask);
taskRouter.put('/update/:id', validateTask, updateTask);
taskRouter.get('/gettask', authMiddleware, getTasks);
taskRouter.delete('/deltask/:id', deleteTaskById);

export default taskRouter;