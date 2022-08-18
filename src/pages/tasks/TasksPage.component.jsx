import React, { useEffect, useState } from "react";
import AddTask from "./add-task/AddTask.component";
import './tasks-page.styles.css'

const TasksPage = () => {

    const [allTasks, setAllTasks] = useState([])

    const handleDeleteTask = async (id) => {
        try {
            const response = await fetch(`http://localhost:4000/tasks/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': `application/json` },
            })

            if (response.status !== 200) {
                throw new Error();
            }

            const responseObj = await response.json();
            setAllTasks(allTasks.filter(item => item._id !== id))
            alert(responseObj.message)

        } catch (err) {
            alert('Something went wrong')
        }
    }

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

            {allTasks.length === 0 ? (<div><br />Your list is empty</div>) :
                allTasks.map((item) => {
                    return (
                        <div>
                            <h3>{item.description}</h3>
                            <button onClick={() => handleDeleteTask(item._id)}>Delete</button>
                        </div>)
                })
            }
        </main>
    )
}

export default TasksPage;