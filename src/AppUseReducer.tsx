import React, {useReducer} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistReducer
} from './reducers/todolist-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './reducers/tasks-reducer';

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TasksStateType = {
    [todoListID: string]: Array<TaskType>
}

function AppUseReducer() {
    // BLL:
    const todoListID_1 = v1();
    const todoListID_2 = v1();

    const [todoLists, dispatchTodoLists] = useReducer(todolistReducer, [
        {id: todoListID_1, title: 'What to learn', filter: 'all'},
        {id: todoListID_2, title: 'What to buy', filter: 'all'}
    ])

    const [tasks, dispatchTasks] = useReducer(tasksReducer, {
        [todoListID_1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
        [todoListID_2]: [
            {id: v1(), title: 'Ice-cream', isDone: true},
            {id: v1(), title: 'Chocolate', isDone: true},
            {id: v1(), title: 'Cake', isDone: false},
            {id: v1(), title: 'Candy', isDone: false},
        ]
    });
    //
    function removeTask(tasksID: string, todoListID: string) {
        dispatchTasks(removeTaskAC(todoListID, tasksID))
    }
    function addTask(title: string, todoListID: string) {
        dispatchTasks(addTaskAC(todoListID, title))
    }
    function changeStatus(taskId: string, isDone: boolean, todoListID: string) {
        dispatchTasks(changeTaskStatusAC(todoListID, taskId, isDone))
    }
    function changeTaskTitle(todoListID: string, id: string, title: string) {
        dispatchTasks(changeTaskTitleAC(todoListID, id, title))
    }


    function removeTodoList(todoListID: string) {
        const action = removeTodolistAC(todoListID)

        dispatchTasks(action)
        dispatchTodoLists(action)
    }

    function addTodolist(title: string) {
        const action = addTodolistAC(title)

        dispatchTodoLists(action)
        dispatchTasks(action)
    }

    function changeFilter(value: FilterValuesType, todoListID: string) {
        dispatchTodoLists(changeTodolistFilterAC(todoListID, value))
    }
    function changeTodolistTitle(todoListID: string, title: string) {
        dispatchTodoLists(changeTodolistTitleAC(todoListID, title))
    }

    const todoListComponents = todoLists.length ? todoLists.map((tl => {
            return (
               <Grid item key={tl.id}>
                   <Paper variant="outlined" style={{padding: "20px"}}>
                       <Todolist todolistID={tl.id}
                                 tasks={tasks[tl.id]}
                                 filter={tl.filter}
                                 title={tl.title}

                                 removeTask={removeTask}
                                 changeTodoListFilter={changeFilter}
                                 addTask={addTask}
                                 changeTaskStatus={changeStatus}

                                 removeTodoList={removeTodoList}
                                 changeTaskTitle={changeTaskTitle}
                                 changeTodolistTitle={changeTodolistTitle}
                       />
                   </Paper>
               </Grid>
            )
        }))
        : <span>Create your first todolist</span>

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{justifyContent: 'space-between'}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolists
                    </Typography>
                    <Button color="inherit" variant={'outlined'}>Login</Button>
                </Toolbar>
            </AppBar>

            <Container fixed>
                <Grid container style={{padding: "15px 0"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={2}>
                    {todoListComponents}
                </Grid>
            </Container>
        </div>
    );
}

export default AppUseReducer;
