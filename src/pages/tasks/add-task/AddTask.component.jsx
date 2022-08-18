import React, { useState } from "react";
import './add-task.styles.css'

const AddTask = (props) => {

    const { allTasks, setAllTasks } = props
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
            setInput("")
            alert(responseObj.message)

        } catch (err) {
            alert('Something went wrong')
        }
    };

    return (
        <div className="add-task">
            <h1>Add a new task</h1>
            <div className="task-group">
                <input type="text" onInput={handleInput} />
                <button type="submit" className="add-task-btn" disabled={isInputLong || !isInputValid} onClick={handleSubmit}>Add</button>
            </div>

            {!isInputValid && <div >You must add a task</div>}
            {isInputLong && <div >Task must be less than 150 characters</div>}
        </div>
    )

}

export default AddTask;