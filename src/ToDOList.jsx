import React, { useState } from "react";

function ToDOList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [editIndex, setEditIndex] = useState(null);
    const [editText, setEditText] = useState("");

    function handleTaskChange(e) {
        setNewTask(e.target.value);
    }

    function addTask() {
        if (newTask.trim() !== "") {
            setTasks([...tasks, { id: Date.now(), text: newTask, isComplete: false }]);
            setNewTask("");
        }
    }

    function deleteTask(index) {
        setTasks(tasks.filter((_, i) => i !== index));
    }

    function startEdit(index) {
        setEditIndex(index);
        setEditText(tasks[index].text);
    }

    function saveEdit(index) {
        const updated = [...tasks];
        updated[index].text = editText;
        setTasks(updated);
        setEditIndex(null);
        setEditText("");
    }

    function toggleDone(index) {
        const updated = [...tasks];
        updated[index].isComplete = !updated[index].isComplete;
        setTasks(updated);
    }

    return (
        <div className="to-do-list">
            <h1>To-Do-List</h1>

            <div>
                <input
                    type="text"
                    placeholder="Enter a task..."
                    value={newTask}
                    onChange={handleTaskChange}
                />
                <button onClick={addTask} className="add-task-btn">
                    Add task
                </button>
            </div>

            <ol>
                {tasks.map((task, index) => (
                    <li key={task.id}>
                        {editIndex === index ? (
                            <>
                                <input
                                    type="text"
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                />
                                <button onClick={() => saveEdit(index)}>Save</button>
                                <button onClick={() => setEditIndex(null)}>Cancel</button>
                            </>
                        ) : (
                            <>
                <span
                    className="text"
                    style={{
                        textDecoration: task.isComplete ? "line-through" : "none",
                    }}
                >
                  {task.text}
                </span>
                                <button onClick={() => deleteTask(index)}>Delete</button>
                                <button onClick={() => startEdit(index)}>Edit</button>
                                <button onClick={() => toggleDone(index)}>
                                    {task.isComplete ? "Undo" : "Done"}
                                </button>
                            </>
                        )}
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default ToDOList;
