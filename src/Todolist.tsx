import React, {useState} from 'react';

type FilterValueType = "all" | "active" | "completed"

type TodolistPropsType = {
    title: string
    tasks: Array<inArrayType>
    removeTask: (id: number) => void
    // changeFilter: (buttonName: filterValuesType) => void
}

type inArrayType = {
    id: number
    title: string
    isDone: boolean
}

export const Todolist = (props: TodolistPropsType) => {

    let [filterName, setFilterName] = useState<FilterValueType>('all');

    const changeFilter = (filterValue: FilterValueType) => {
        setFilterName(filterValue);
    }

    let taskList = props.tasks;

    if (filterName === "active") {
        taskList = props.tasks.filter((task) => !task.isDone)
    }
    if (filterName === "completed") {
        taskList = props.tasks.filter((task) => task.isDone)
    }


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {taskList.map((el) => {
                    return (
                        <li key={el.id}>

                        <button onClick={() => {
                            props.removeTask(el.id)
                        }}>
                            X
                        </button>

                        <input type="checkbox" checked={el.isDone}/>
                        <span>{el.title}</span>
                    </li>
                    )
                })}
            </ul>

            <div>
                <button onClick={() => {changeFilter('all')} }>All</button>
                <button onClick={() => {changeFilter('active')} }>Active</button>
                <button onClick={() => {changeFilter('completed')} }>Completed</button>
            </div>
        </div>
    );
}