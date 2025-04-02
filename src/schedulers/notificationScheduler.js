const cron = require("node-cron");
const { Op } = require("sequelize");
const { Project, Task, Issue, User } = require("../models");
const NotificationService = require("../services/notificationService");

cron.schedule("0 */4 * * *", async () => {
  try {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    const dayAfterTomorrow = new Date(now);
    dayAfterTomorrow.setDate(now.getDate() + 2);

    const dateRange = { [Op.between]: [now, dayAfterTomorrow] };

    const getDayName = (date) => date.toLocaleDateString("en-US", { weekday: "long" });

    // Project Reminders
    const projects = await Project.findAll({
      where: { endDate: dateRange },
      include: [{ model: User, as: "creator", attributes: ["userId", "name", "email"] }],
    });

    for (const project of projects) {
      const dueDate = new Date(project.endDate);
      const dayName = getDayName(dueDate);
      const dueInDays = Math.ceil((dueDate - now) / (1000 * 60 * 60 * 24));

      const message = `Reminder: Project "${project.projectName}" is due on ${dayName} (${dueInDays} day(s) remaining). Please review the progress and ensure timely completion.`;

      await NotificationService.createNotification(project.creator.userId, "project", message);
    }

    // Task Reminders
    const tasks = await Task.findAll({
      where: { endDate: dateRange },
      include: [{ model: User, as: "creator", attributes: ["userId", "name", "email"] }],
    });

    for (const task of tasks) {
      const dueDate = new Date(task.endDate);
      const dayName = getDayName(dueDate);
      const dueInDays = Math.ceil((dueDate - now) / (1000 * 60 * 60 * 24));

      const creatorMessage = `Reminder: Your task "${task.name}" is due on ${dayName} (${dueInDays} day(s) left). Please follow up and update the progress to stay on track.`;
      await NotificationService.createNotification(task.creator.userId, "task", creatorMessage);

      if (task.assignedUserIds && Array.isArray(task.assignedUserIds)) {
        for (const assignedUserId of task.assignedUserIds) {
          const assignedMessage = `Action Required: The task "${task.name}" assigned to you is due on ${dayName} (${dueInDays} day(s) left). Please complete the task or update the progress accordingly.`;
          await NotificationService.createNotification(assignedUserId, "task", assignedMessage);
        }
      }
    }

    // Issue Reminders
    const issues = await Issue.findAll({
      where: { dueDate: dateRange },
      include: [
        { model: User, as: "creator", attributes: ["userId", "name", "email"] },
        { model: User, as: "assignedUser", attributes: ["userId", "name", "email"] },
      ],
    });

    for (const issue of issues) {
      const dueDate = new Date(issue.dueDate);
      const dayName = getDayName(dueDate);
      const dueInDays = Math.ceil((dueDate - now) / (1000 * 60 * 60 * 24));

      const creatorMessage = `Reminder: The issue "${issue.issueTitle}" is due on ${dayName} (${dueInDays} day(s) remaining). Please take the necessary follow-up actions and update the progress.`;

      await NotificationService.createNotification(issue.creator.userId, "issue", creatorMessage);

      if (issue.assignedUser) {
        const assignedMessage = `Action Required: The issue "${issue.issueTitle}" assigned to you is due on ${dayName} (${dueInDays} day(s) left). Please complete the task or update the progress accordingly.`;

        await NotificationService.createNotification(issue.assignedUser.userId, "issue", assignedMessage);
      }
    }
  } catch (error) {
    console.error("Error in Notification Scheduler:", error);
  }
});
