import tasks from '../models/taskModel.js';
import { calculateTimeLapsed, calculateBalanceTime } from '../utils/timeCalculations.js';

export const getDashboardStats = async (req, res) => {
  try {
    // Fetch tasks from MongoDB
    const allTasks = await tasks.find();
    
    if (!Array.isArray(allTasks)) {
      return res.status(500).json({ error: 'Tasks is not an array' });
    }

    const totalTasks = allTasks.length;
    const completedTasks = allTasks.filter(task => task.status === 'finished').length;
    const pendingTasks = allTasks.filter(task => task.status === 'pending').length;

    let sumOfTimeLapsed = 0;
    let sumOfTimeToFinish = 0;

    // Priority-based summary (ensures all 5 priorities exist)
    const prioritySummary = [1, 2, 3, 4, 5].map(priority => {
      const tasksByPriority = allTasks.filter(task => task.priority === priority && task.status === 'pending');
      const pendingCount = tasksByPriority.length;

      const stats = tasksByPriority.reduce(
        (acc, task) => {
          const now = new Date();
          const timeLapsed = calculateTimeLapsed(task.startTime, now);
          const timeToFinish = calculateBalanceTime(task.endTime, now);
          
          acc.totalTimeLapsed += timeLapsed;
          acc.balanceTimeLeft += timeToFinish;
          
          // Accumulate totals for final sum
          sumOfTimeLapsed += timeLapsed;
          sumOfTimeToFinish += timeToFinish;

          return acc;
        },
        { totalTimeLapsed: 0, balanceTimeLeft: 0 }
      );

      return {
        priority,
        pendingTasks: pendingCount,
        timeLapsed: pendingCount > 0 ? (stats.totalTimeLapsed / pendingCount).toFixed(2) : "0.00",
        timeToFinish: pendingCount > 0 ? (stats.balanceTimeLeft / pendingCount).toFixed(2) : "0.00",
      };
    });

    // Calculate avg time per task (avoid division by zero)
    const avgTimePerTask = totalTasks > 0 ? (sumOfTimeLapsed / totalTasks).toFixed(2) : "0.00";

    res.json({
      totalTasks,
      pendingTasks,
      completedPercentage: totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0,
      pendingPercentage: totalTasks > 0 ? ((totalTasks - completedTasks) / totalTasks) * 100 : 0,
      prioritySummary,
      sumOfTimeLapsed: sumOfTimeLapsed.toFixed(2),
      sumOfTimeToFinish: sumOfTimeToFinish.toFixed(2),
      avgTimePerTask,
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
