import Task from "../model/task.js";

//Create Task

export const CreateTask = async (req, res) => {
  try {
    const task = new Task({
      text: req.body.text,
    });
    const savedTask = await task.save();
    const { __v, ...other } = savedTask._doc;
    res.status(200).send(other);
  } catch (error) {
    res.status(500).send(error);
  }
};

//Display all Task

export const DisplayTask = async (req, res) => {
  try {
    const tasks = await Task.find();
    const updatedTasks = [];
    tasks.map((task) => {
      const { __v, ...other } = task._doc;
      updatedTasks.push(other);
    });
    res.status(200).send(updatedTasks);
  } catch (error) {
    res.status(500).send(error);
  }
};

//Delete Task

export const DeleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    await task.deleteOne();
    res.status(200).send("Task is deleted now.");
  } catch (error) {
    res.status(500).send(error);
  }
};

//Update Task

export const UpdateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    await task.updateOne({ $set: req.body });
    res.status(200).send("Task is updated");
  } catch (error) {
    res.status(500).send(error);
  }
};
