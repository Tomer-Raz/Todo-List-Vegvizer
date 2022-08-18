import React, { useEffect, useState } from "react";
import './tasks-page.styles.css'

const TasksPage = () => {

    const [allTasks, setAllTasks] = useState([])
    const [input, setInput] = useState('');
    const [isInputValid, setIsInputValid] = useState(true);
    const [isInputLong, setIsInputLong] = useState(false);

    const handleInput = (event) => {
        const taskInput = event.target.value.trim();
        setInput(taskInput);

        taskInput === '' ? setIsInputValid(false) : setIsInputValid(true);
        taskInput.length > 150 ? setIsInputLong(true) : setIsInputLong(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            description: input,
        }

        try {
            const response = await fetch('http://localhost:4000/tasks/new', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })

            if (response.status !== 201) {
                throw new Error();
            }

            const responseObj = await response.json();
            const task = responseObj.data;
            setAllTasks([...allTasks, task])
            alert(responseObj.message)

        } catch (err) {
            alert('Something went wrong')
        }
    };

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

            <h1>Add a new task</h1>
            <div>
                <input type="text" onInput={handleInput} />
                <button type="submit" disabled={isInputLong || !isInputValid} onClick={handleSubmit}>Add</button>
            </div>

            {!isInputValid && <div >You must add a task</div>}
            {isInputLong && <div >Task must be less than 150 characters</div>}

            {allTasks.length === 0 ? (<div><br />Your list is empty</div>) :
                allTasks.map((task) => {
                    return (
                        <div>
                            <h3>{task.description}</h3>
                            <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
                        </div>)
                })
            }
        </main>
    )
}

export default TasksPage;