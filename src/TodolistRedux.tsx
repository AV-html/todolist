import React, {useCallback} from 'react';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {TodoListType} from './AppRedux';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {addTaskAC} from './reducers/tasks-reducer';
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from './reducers/todolist-reducer';
import {Task} from './Task';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolist: TodoListType
}


export const TodolistRedux = React.memo(({todolist}: PropsType) => {

    console.log('Todolist redux render');

    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[todolist.id])

    const dispatch = useDispatch()


    let tasksForTodolist = tasks;
    if (todolist.filter === 'active') {
        tasksForTodolist = tasks.filter(t => !t.isDone);
    }
    if (todolist.filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.isDone);
    }

    // const tasksForTodolist = useMemo(() => {
    //     if (todolist.filter === 'active') {
    //         return tasks.filter(t => !t.isDone);
    //     }
    //     if (todolist.filter === 'completed') {
    //         return tasks.filter(t => t.isDone);
    //     }
    //     return tasks
    // }, [todolist.filter, tasks])



    const tasksComponents = tasksForTodolist.map(t => {
        return <Task key={t.id}
                     todolistID={todolist.id}
                     task={t}
        />
        // return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
        //     <Checkbox
        //         onChange={onChangeHandler}
        //         checked={t.isDone}
        //         size={'small'}
        //         color={'primary'}
        //
        //     />
        //     <EditableSpan title={t.title} updateTitle={updateTaskText}/>
        //     <IconButton onClick={onClickHandler} size={'small'}>
        //         <Delete/>
        //     </IconButton>
        // </li>
    })

    const onDeleteTodoListClickHandler = useCallback(() => {
        dispatch(removeTodolistAC(todolist.id))
    }, [dispatch, todolist.id])
    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(todolist.id, title))
    }, [todolist.id, dispatch])

    const updateTodolistTitle = useCallback((newTitle: string) => {
        dispatch(changeTodolistTitleAC(todolist.id, newTitle))
    }, [dispatch, todolist.id])


    return (
        <div>

            <h3>
                <EditableSpan title={todolist.title} updateTitle={updateTodolistTitle}/>
                <IconButton onClick={onDeleteTodoListClickHandler} size={'small'}>
                    <Delete/>
                </IconButton>
            </h3>

            <AddItemForm addItem={addTask}/>

            <ul>
                {tasksComponents}
            </ul>

            <FilterComponent todolist={todolist}/>

        </div>
    )
})


const FilterComponent = React.memo(({todolist}: { todolist: TodoListType }) => {

    const dispatch = useDispatch()
    const onAllClickHandler = () => dispatch(changeTodolistFilterAC(todolist.id, 'all'));
    const onActiveClickHandler = () => dispatch(changeTodolistFilterAC(todolist.id, 'active'));
    const onCompletedClickHandler = () => dispatch(changeTodolistFilterAC(todolist.id, 'completed'));

    return (
        <div>
            <Button
                variant={todolist.filter === 'all' ? 'outlined' : 'contained'}
                color="primary"
                size="small"
                disableElevation
                onClick={onAllClickHandler}
            >
                All
            </Button>
            <Button
                variant={todolist.filter === 'active' ? 'outlined' : 'contained'}
                color="primary"
                size="small"
                disableElevation
                onClick={onActiveClickHandler}
            >
                Active
            </Button>
            <Button
                variant={todolist.filter === 'completed' ? 'outlined' : 'contained'}
                color="primary"
                size="small"
                disableElevation
                onClick={onCompletedClickHandler}
            >
                Completed
            </Button>
        </div>
    )
})


