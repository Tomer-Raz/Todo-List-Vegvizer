import React, { useEffect, useState } from "react";
import AddTask from "./add-task/AddTask.component";
import TasksContainer from "./tasks-conatiner/TasksContainer.component";
import './tasks-page.styles.css'

const TasksPage = () => {

    const [allTasks, setAllTasks] = useState([])

    useEffect(() => {
        const getTasks = async () => {
            try {
                const response = await fetch('http://localhost:4000/tasks')
                if (!response.ok) {
                    throw new Error();
                }
                const responseObj = await response.json();
                const tasks = responseObj.data;
                setAllTasks(tasks)

            } catch (err) {
                alert("something went wrong!");
            }
        }
        getTasks()
    }, [])

    return (
        <main className="tasks-page">
            <AddTask allTasks={allTasks} setAllTasks={setAllTasks} />
            <TasksContainer allTasks={allTasks} setAllTasks={setAllTasks} />
        </main>
    )
}

export default TasksPage;