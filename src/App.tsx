import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';

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

// function App() {
//     // BLL:
//     const todoListID_1 = v1();
//     const todoListID_2 = v1();
//
//     const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
//         {id: todoListID_1, title: 'What to learn', filter: 'all'},
//         {id: todoListID_2, title: 'What to buy', filter: 'all'}
//     ])
//
//     const [tasks, setTasks] = useState<TasksStateType>({
//         [todoListID_1]: [
//             {id: v1(), title: 'HTML&CSS', isDone: true},
//             {id: v1(), title: 'JS', isDone: true},
//             {id: v1(), title: 'ReactJS', isDone: false},
//             {id: v1(), title: 'Rest API', isDone: false},
//             {id: v1(), title: 'GraphQL', isDone: false},
//         ],
//         [todoListID_2]: [
//             {id: v1(), title: 'Ice-cream', isDone: true},
//             {id: v1(), title: 'Chocolate', isDone: true},
//             {id: v1(), title: 'Cake', isDone: false},
//             {id: v1(), title: 'Candy', isDone: false},
//         ]
//     });
//
//
//     function removeTask(tasksID: string, todoListID: string) {
//         setTasks({...tasks, [todoListID]: tasks[todoListID].filter(t => t.id !== tasksID)});
//     }
//     function addTask(title: string, todoListID: string) {
//         const task = {
//             id: v1(), title: title, isDone: false
//         };
//
//         setTasks({...tasks, [todoListID]: [task, ...tasks[todoListID]]});
//     }
//     function changeStatus(taskId: string, isDone: boolean, todoListID: string) {
//
//         const changeTasksArray = tasks[todoListID].map(
//             (t) => {
//                 return t.id === taskId ? {...t, isDone: isDone} : t
//             }
//         )
//
//         setTasks({...tasks, [todoListID]: changeTasksArray});
//     }
//     function changeTaskTitle(todoListID: string, id: string, title: string) {
//         setTasks({...tasks, [todoListID]: tasks[todoListID].map((t) => t.id === id ? {...t, title} : t)});
//     }
//
//
//     function removeTodoList(todoListID: string) {
//         setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
//         delete tasks[todoListID]
//     }
//     function addTodolist(title: string) {
//         const newTodoListID = v1()
//         const newTodoList: TodoListType = {
//             id: newTodoListID,
//             title,
//             filter: 'all'
//         }
//         setTodoLists([...todoLists, newTodoList])
//         setTasks({...tasks, [newTodoListID]: []})
//     }
//     function changeFilter(value: FilterValuesType, todoListID: string) {
//         const changeFilterTodolist = todoLists.map(
//             (t) => t.id === todoListID ? {...t, filter: value} : t
//         )
//         setTodoLists(changeFilterTodolist);
//     }
//     function changeTodolistTitle(todoListID: string, title: string) {
//         setTodoLists(todoLists.map((tl) => tl.id === todoListID ? {...tl, title} : tl))
//     }
//
//     const todoListComponents = todoLists.length ? todoLists.map((tl => {
//             return (
//                <Grid item key={tl.id}>
//                    <Paper variant="outlined" style={{padding: "20px"}}>
//                        <Todolist todolistID={tl.id}
//                                  tasks={tasks[tl.id]}
//                                  filter={tl.filter}
//                                  title={tl.title}
//
//                                  removeTask={removeTask}
//                                  changeTodoListFilter={changeFilter}
//                                  addTask={addTask}
//                                  changeTaskStatus={changeStatus}
//
//                                  removeTodoList={removeTodoList}
//                                  changeTaskTitle={changeTaskTitle}
//                                  changeTodolistTitle={changeTodolistTitle}
//                        />
//                    </Paper>
//                </Grid>
//             )
//         }))
//         : <span>Create your first todolist</span>
//
//     return (
//         <div className="App">
//             <AppBar position="static">
//                 <Toolbar style={{justifyContent: 'space-between'}}>
//                     <IconButton edge="start" color="inherit" aria-label="menu">
//                         <Menu/>
//                     </IconButton>
//                     <Typography variant="h6">
//                         Todolists
//                     </Typography>
//                     <Button color="inherit" variant={'outlined'}>Login</Button>
//                 </Toolbar>
//             </AppBar>
//
//             <Container fixed>
//                 <Grid container style={{padding: "15px 0"}}>
//                     <AddItemForm addItem={addTodolist}/>
//                 </Grid>
//                 <Grid container spacing={2}>
//                     {todoListComponents}
//                 </Grid>
//             </Container>
//         </div>
//     );
// }

function App() {
   return <></>
}

export default App;
