import React, {ChangeEvent, useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './reducers/tasks-reducer';
import {Checkbox, IconButton} from '@material-ui/core';
import {EditableSpan} from './EditableSpan';
import {Delete} from '@material-ui/icons';
import {TaskType} from './TodolistRedux';

export type TaskPropsType = {
    task: TaskType
    todolistID: string
}
export const Task = React.memo(({task, todolistID}: TaskPropsType) => {
    const dispatch = useDispatch();

    const onClickHandler = () => {
        dispatch(removeTaskAC(todolistID, task.id))
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(todolistID, task.id, e.currentTarget.checked))
    }
    const updateTaskText = useCallback((newTitle: string) => {
        dispatch(changeTaskTitleAC(todolistID, task.id, newTitle))
    }, [dispatch, todolistID, task.id])

    return (
        <li className={task.isDone ? 'is-done' : ''}>
            <Checkbox
                onChange={onChangeHandler}
                checked={task.isDone}
                size={'small'}
                color={'primary'}

            />
            <EditableSpan title={task.title} updateTitle={updateTaskText}/>
            <IconButton onClick={onClickHandler} size={'small'}>
                <Delete/>
            </IconButton>
        </li>
    )
})