import React, {useCallback} from 'react';
import './App.css';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    addTodolistAC,
} from './reducers/todolist-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {TodolistRedux} from './TodolistRedux';

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

function AppRedux() {

    const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists)

    const dispatch = useDispatch() // Вызывается 1 раз!!!


    const addTodolist = useCallback((title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)
    }, [dispatch])



    const todoListComponents = todoLists.length ? todoLists.map((tl => {

            return (
                <Grid item key={tl.id}>
                    <Paper variant="outlined" style={{padding: '20px'}}>
                        <TodolistRedux
                            todolist={tl}
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
                <Grid container style={{padding: '15px 0'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={2}>
                    {todoListComponents}
                </Grid>
            </Container>
        </div>
    );
}

export default AppRedux;
