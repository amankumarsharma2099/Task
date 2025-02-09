import tasks from '../models/taskModel.js';
// import userModel from "../models/userModel.js";





 export const createTask = async (req, res) => {
  const { title, startTime, endTime, priority, status } = req.body;
  try {
    const newTask = new tasks({ user: req.user.id, title, startTime, endTime, priority, status });
    await newTask.save();
    res.status(201).json({ message: 'Task is created', success: true });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create task', success: false });
  }
}




export const deleteTaskById = async (req, res) => {
  try {
      const { id } = req.params.id;
      await tasks.findByIdAndDelete(id);
      res.status(200)
          .json({ message: 'Task is deleted', success: true });
  } catch (err) {
      res.status(500).json({ message: 'Failed to delete task', success: false });
  }
}




export const updateTask = async (req, res) => {
  try{
  const id  = req.params.id;
  const { title, startTime, endTime, priority, status } = req.body;

  const task = await tasks.findById(id);

  if (!task) {
    return res.status(404).json({ message: "Task not found!" });
  }

  task.title = title || task.title;
  task.startTime = startTime || task.startTime;
  task.endTime = endTime || task.endTime;
  task.priority = priority || task.priority;
  task.status = status || task.status;

  await task.save();

  res.status(200)
            .json({ message: 'Task Updated', success: true });
    } catch (err) {
        res.status(500).json({ message: 'Failed to updated task', success: false });
    }
};



export const getTasks = async (req, res) => {
  const { priority, status, sortBy } = req.query;
  const task = await tasks.find();
  let filteredTasks = task;

  if (priority) filteredTasks = filteredTasks.filter(task => task.priority === parseInt(priority, 10));
  if (status) filteredTasks = filteredTasks.filter(task => task.status === status);

  if (sortBy === 'startTime') filteredTasks.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
  if (sortBy === 'endTime') filteredTasks.sort((a, b) => new Date(a.endTime) - new Date(b.endTime));

  res.json(filteredTasks);
};

// GET /tasks?priority=1&status=Completed&sortBy=startTime
