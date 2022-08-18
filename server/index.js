import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import ConnectToMongodb from './databases/database.js'
import taskRouter from './routers/task.router.js'

dotenv.config();

const app = express();

app.use(express.json())
app.use(cors())

const port = 4000;

app.use(taskRouter)

app.listen(port, async () => {
    console.log(`server is running on ${port}...`);
    await ConnectToMongodb()
})