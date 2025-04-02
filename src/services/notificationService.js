const Notification = require("../models/notification");

const createNotification = async (userId, type, message) => {
  try {
    await Notification.create({
      userId,
      type,
      message,
    });
  } catch (error) {
    console.error("Error creating notification:", error);
  }
};

module.exports = {
  createNotification,
};