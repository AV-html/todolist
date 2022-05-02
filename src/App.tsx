import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";


function App() {

    // const tasks1 = [
    //     { id: 1, title: "HTML&CSS", isDone: true },
    //     { id: 2, title: "JS", isDone: true },
    //     { id: 3, title: "ReactJS", isDone: false }
    // ]


    const [tasks, setTasks] = useState([
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false }
    ])

    const removeTask = (removeId: number) => {
        setTasks(tasks.filter(el => el.id !== removeId))
    }

    // Какие значения пойдут в useState

    // let [filterName, setFilterName] = useState('all');
    // const changeFilter = (filterValue: "all" | "active" | "completed") => {
    //     setFilterName(filterValue);
    // }
    // let taskList = tasks;
    //
    // if (filterName === "active") {
    //     taskList = tasks.filter((task) => !task.isDone)
    // }
    // if (filterName === "completed") {
    //     taskList = tasks.filter((task) => task.isDone)
    // }

    return (
        <div className="App">
           <Todolist
               title = {'Books'}
               tasks = {tasks}
               removeTask = {removeTask}
               // changeFilter = {changeFilter}
           />
        </div>
    );
}

export default App;
