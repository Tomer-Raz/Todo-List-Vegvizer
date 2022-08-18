import Task from "../models/task.model.js";

export const createTask = async (req, res) => {
    const data = req.body;

    try {
        const task = new Task({
            description: data.description,
        });

        await task.save();

        res.status(201).send({
            status: 201,
            statusText: 'Created',
            data: task,
            message: 'Task Created!'
        })

    } catch (err) {
        res.status(400).send({
            status: 400,
            statusText: "Bad request",
            message: '',
        })
    }
}

export const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();

        res.send({
            status: 200,
            statusText: 'ok',
            data: tasks,
            message: ''
        })

    } catch (err) {
        res.status(400).send({
            status: 400,
            statusText: "Bad request",
            message: '',
        })
    }
}

export const deleteTask = async (req, res) => {
    const taskID = req.params.taskID

    try {
        await Task.findByIdAndDelete(taskID);

        res.send({
            status: 200,
            statusText: 'ok',
            data: {},
            message: 'Task deleted successfully'
        })

    } catch (err) {
        res.status(400).send({
            status: 400,
            statusText: "Bad request",
            message: '',
        })
    }
}

export const updateTask = async (req, res) => {
    const taskID = req.params.taskID;
    const data = req.body;

    try {
        await Task.findByIdAndUpdate(taskID, data);

        res.status(202).send({
            status: 202,
            statusText: 'Accepted',
            data: {},
            message: 'Task Updated!'
        })

    } catch (err) {
        res.status(400).send({
            status: 400,
            statusText: "Bad request",
            message: '',
        })
    }
}