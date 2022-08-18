import React from 'react'
import './tasks-container.styles.css'

const TasksContainer = (props) => {
    const { allTasks, setAllTasks } = props;

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

    return (
        <ul className="tasks-container">
            {allTasks.length === 0 ? (<div className="empty-list">Your list is empty</div>) :
                allTasks.map((item) => {
                    return (
                        <div className='task-container'>
                            <h3 className='task-title'>{item.description}</h3>
                            <button className='delete-btn' onClick={() => handleDeleteTask(item._id)}>Delete</button>
                        </div>)
                })
            }

        </ul>

    )
}

export default TasksContainer;
