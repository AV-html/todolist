import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, Checkbox, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';

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
    changeTodolistTitle: (todoListID: string, title: string) => void
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
            <Checkbox
                   onChange={onChangeHandler}
                   checked={t.isDone}
                   size={'small'}
                   color={'primary'}

            />
            <EditableSpan title={t.title} updateTitle={updateTaskText}/>
            {/*<span>{t.title}</span>*/}
            <IconButton onClick={onClickHandler} size={'small'}>
                <Delete/>
            </IconButton>
        </li>
    })

    const onDeleteTodoListClickHandler = () => {
        props.removeTodoList(props.todolistID);
    }
    const addTask = (title: string) => {
        props.addTask(title, props.todolistID)
    }
    const updateTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.todolistID, newTitle)
    }


    return (
        <div>

            <h3>
                <EditableSpan title={props.title} updateTitle={updateTodolistTitle}/>
                <IconButton onClick={onDeleteTodoListClickHandler} size={'small'} >
                    <Delete/>
                </IconButton>
            </h3>

            <AddItemForm addItem={addTask}/>

            <ul>
                {tasksComponents}
            </ul>
            <div>
                <Button
                    variant={props.filter === 'all' ? 'outlined' : 'contained'}
                    color="primary"
                    size='small'
                    disableElevation
                    onClick={onAllClickHandler}
                >
                    All
                </Button>
                <Button
                    variant={props.filter === 'active' ? 'outlined' : 'contained'}
                    color="primary"
                    size='small'
                    disableElevation
                    onClick={onActiveClickHandler}
                >
                    Active
                </Button>
                <Button
                    variant={props.filter === 'completed' ? 'outlined' : 'contained'}
                    color="primary"
                    size='small'
                    disableElevation
                    onClick={onCompletedClickHandler}
                >
                    Completed
                </Button>
            </div>
        </div>
    )
}
