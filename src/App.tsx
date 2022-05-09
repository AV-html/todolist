import React, { useState } from 'react';
import './App.css';
import { Todolist } from "./Todolist";
import {v1} from 'uuid';


function App() {

    const [tasks, setTasks] = useState([
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "React", isDone: false },
        { id: v1(), title: "TS", isDone: false },
        { id: v1(), title: "GraphQL", isDone: false }
    ])

    const removeTask = (removeId: string) => {
        setTasks(tasks.filter(el => el.id !== removeId))
    }

    const addTask = (title: string) => {
        const newTask = {id: v1(), title: title, isDone: false}
        setTasks([newTask, ...tasks])
    }


    return (
        <div className="App">
            <Todolist
                title={'Books'}
                tasks={tasks}
                removeTask={removeTask}
                addTask={addTask}
            />
        </div>
    );
}

export default App;
