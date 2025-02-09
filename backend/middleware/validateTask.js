export const validateTask = (req, res, next) => {
  const { title, startTime, endTime, priority, status } = req.body;

  if (!title || !startTime || !endTime || !priority || !status) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  if (priority < 1 || priority > 5) {
    return res.status(400).json({ message: 'Priority must be between 1 and 5.' });
  }

  if (!['pending', 'finished'].includes(status)) {
    return res.status(400).json({ message: 'Status must be either pending or finished.' });
  }

  next();
};

export default validateTask;