import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';

export type FilterValuesType = 'all' | 'active' | 'completed';

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TasksStateType = {
    [todoListID: string]: Array<TaskType>
}

function App() {
    // BLL:
    const todoListID_1 = v1();
    const todoListID_2 = v1();

    // Чтобы использовать методы массивов [{}, {}, {}]
    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID_1, title: 'What to learn', filter: 'all'},
        {id: todoListID_2, title: 'What to buy', filter: 'all'}
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
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

    // Из какого удалить, в какой добавить, какой фильтровать?
    // Добавить todoListID: string

    function removeTask(tasksID: string, todoListID: string) {
        setTasks({...tasks, [todoListID]: tasks[todoListID].filter(t => t.id !== tasksID)});
    }

    function changeFilter(value: FilterValuesType, todoListID: string) {
        const changeFilterTodolist = todoLists.map(
            (t) => t.id === todoListID ? {...t, filter: value} : t
        )
        setTodoLists(changeFilterTodolist);
    }

    function changeStatus(taskId: string, isDone: boolean, todoListID: string) {

        const changeTasksArray = tasks[todoListID].map(
            (t) => {
                return t.id === taskId ? {...t, isDone: isDone} : t
            }
        )

        setTasks({...tasks, [todoListID]: changeTasksArray});
    }

    function addTask(title: string, todoListID: string) {
        const task = {
            id: v1(), title: title, isDone: false
        };
        // const currentTodoListTasks = tasks[todoListID];
        // const newTasks = [task, ...currentTodoListTasks];
        // setTasks({...tasks, [todoListID]: newTasks});

        setTasks({...tasks, [todoListID]: [task, ...tasks[todoListID]]});
    }

    function removeTodoList(todoListID: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
    }

    function addTodolist(title: string) {
        const newTodoListID = v1()
        const newTodoList: TodoListType = {
            id: newTodoListID,
            title,
            filter: 'all'
        }
        setTodoLists([...todoLists, newTodoList])
        setTasks({...tasks, [newTodoListID]: []})
    }


    const todoListComponents = todoLists.length ? todoLists.map((tl =>   {
            return (
                <Todolist key={tl.id}
                          todolistID={tl.id}
                          tasks={tasks[tl.id]}
                          filter={tl.filter}
                          title={tl.title}

                          removeTask={removeTask}
                          changeTodoListFilter={changeFilter}
                          addTask={addTask}
                          changeTaskStatus={changeStatus}

                          removeTodoList={removeTodoList}
                />
            )
        }))
        : <span>Create your first todolist</span>


    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {todoListComponents}
        </div>
    );
}

export default App;
