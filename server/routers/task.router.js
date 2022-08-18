import express from 'express'
import * as taskController from '../controllers/task.controller.js'

const router = new express.Router();

router.post('/tasks/new', taskController.createTask)

router.get('/tasks', taskController.getAllTasks)

router.delete('/tasks/:taskID', taskController.deleteTask)

router.patch('/tasks/:taskID', taskController.updateTask)

export default router;