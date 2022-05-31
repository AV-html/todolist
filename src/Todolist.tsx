import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistID: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    title: string

    removeTask: (taskId: string, todoListID: string) => void
    changeTodoListFilter: (value: FilterValuesType, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListID: string) => void

    removeTodoList: (todoListID: string) => void
    changeTaskTitle: (todoListID: string, id: string, title: string) => void
}

export function Todolist(props: PropsType) {

    const onAllClickHandler = () => props.changeTodoListFilter('all', props.todolistID);
    const onActiveClickHandler = () => props.changeTodoListFilter('active', props.todolistID);
    const onCompletedClickHandler = () => props.changeTodoListFilter('completed', props.todolistID);


    let tasksForTodolist = props.tasks;
    if (props.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => !t.isDone);
    }
    if (props.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.isDone);
    }

    const tasksComponents = tasksForTodolist.map(t => {
        const onClickHandler = () => props.removeTask(t.id, props.todolistID)
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.todolistID)
        }
        const updateTaskText = (newTitle: string) => {
            props.changeTaskTitle(props.todolistID, t.id, newTitle)
        }

        return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
            <input type="checkbox"
                   onChange={onChangeHandler}
                   checked={t.isDone}/>
            <EditableSpan title={t.title} updateTitle={updateTaskText}/>
            {/*<span>{t.title}</span>*/}
            <button onClick={onClickHandler}>x</button>
        </li>
    })

    const onDeleteTodoListClickHandler = () => {
        props.removeTodoList(props.todolistID);
    }


    const addTask = (title: string) => {
        props.addTask(title, props.todolistID)
    }


    return (
        <div>

            <h3>
                {props.title}
                <button onClick={onDeleteTodoListClickHandler}>
                    <span role={'img'} aria-label={'Cross Mark'}>
                        ❌
                    </span>
                </button>
            </h3>

            <AddItemForm addItem={addTask}/>

            <ul>
                {tasksComponents}
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''}
                        onClick={onAllClickHandler}>
                    All
                </button>
                <button className={props.filter === 'active' ? 'active-filter' : ''}
                        onClick={onActiveClickHandler}>
                    Active
                </button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''}
                        onClick={onCompletedClickHandler}>
                    Completed
                </button>
            </div>
        </div>
    )
}
