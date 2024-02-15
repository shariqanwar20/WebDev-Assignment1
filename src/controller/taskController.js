// create crud operations for task

const Task = require("../models/task");

const createTask = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter all fields" });
    }

    const task = await Task.create({ name, description, owner: req.user._id });
    res.status(200).json({
      success: true,
      message: "Task created successfully",
      data: task,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ owner: req.user._id });
    
    if (!tasks) {
      return res
        .status(400)
        .json({ success: false, message: "Tasks not found" });
    }

    res.status(200).json({
      success: true,
      message: "Tasks fetched successfully",
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res
        .status(400)
        .json({ success: false, message: "Task not found" });
    }
    res.status(200).json({
      success: true,
      message: "Task fetched successfully",
      data: task,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateTask = async (req, res, next) => {
  try {
    const { name, description, completed } = req.body;
    const task = await Task.findByIdAndUpdate(req.params.id, {
        name,
        description,
        completed,
    }, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res
        .status(400)
        .json({ success: false, message: "Task not found" });
    }
    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: task,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res
        .status(400)
        .json({ success: false, message: "Task not found" });
    }
    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
      data: task,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTask,
  updateTask,
  deleteTask,
};