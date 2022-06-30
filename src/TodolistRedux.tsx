import React, {ChangeEvent} from 'react';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, Checkbox, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {TodoListType} from './AppRedux';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './reducers/tasks-reducer';
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from './reducers/todolist-reducer';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolist: TodoListType
}



export function TodolistRedux({todolist}: PropsType) {

    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[todolist.id])

    const dispatch = useDispatch()

    const onAllClickHandler = () => dispatch(changeTodolistFilterAC(todolist.id, 'all'));
    const onActiveClickHandler = () => dispatch(changeTodolistFilterAC(todolist.id, 'active'));
    const onCompletedClickHandler = () => dispatch(changeTodolistFilterAC(todolist.id, 'completed'));



    let tasksForTodolist = tasks;
    if (todolist.filter === 'active') {
        tasksForTodolist = tasks.filter(t => !t.isDone);
    }
    if (todolist.filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.isDone);
    }

    const tasksComponents = tasksForTodolist.map(t => {
        const onClickHandler = () => {
            dispatch(removeTaskAC(todolist.id, t.id))
        }

        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            dispatch(changeTaskStatusAC(todolist.id, t.id, e.currentTarget.checked))
        }
        const updateTaskText = (newTitle: string) => {
            dispatch(changeTaskTitleAC(todolist.id, t.id, newTitle))
        }

        return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
            <Checkbox
                   onChange={onChangeHandler}
                   checked={t.isDone}
                   size={'small'}
                   color={'primary'}

            />
            <EditableSpan title={t.title} updateTitle={updateTaskText}/>
            <IconButton onClick={onClickHandler} size={'small'}>
                <Delete/>
            </IconButton>
        </li>
    })

    const onDeleteTodoListClickHandler = () => {
        dispatch(removeTodolistAC(todolist.id))
    }
    const addTask = (title: string) => {
        dispatch(addTaskAC(todolist.id, title))
    }
    const updateTodolistTitle = (newTitle: string) => {
        dispatch(changeTodolistTitleAC(todolist.id, newTitle))
    }


    return (
        <div>

            <h3>
                <EditableSpan title={todolist.title} updateTitle={updateTodolistTitle}/>
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
                    variant={todolist.filter === 'all' ? 'outlined' : 'contained'}
                    color="primary"
                    size='small'
                    disableElevation
                    onClick={onAllClickHandler}
                >
                    All
                </Button>
                <Button
                    variant={todolist.filter === 'active' ? 'outlined' : 'contained'}
                    color="primary"
                    size='small'
                    disableElevation
                    onClick={onActiveClickHandler}
                >
                    Active
                </Button>
                <Button
                    variant={todolist.filter === 'completed' ? 'outlined' : 'contained'}
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
