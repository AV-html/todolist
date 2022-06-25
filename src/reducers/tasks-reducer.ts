import {TasksStateType} from '../App';
import {ADD_TODOLIST, AddTodolistAT, REMOVE_TODOLIST, RemoveTodolistAT} from './todolist-reducer';


export const REMOVE_TASK = 'REMOVE_TASK'
export const ADD_TASK = 'ADD_TASK'
export const CHANGE_TASK_STATUS = 'CHANGE-TASK-STATUS'
export const CHANGE_TASK_TITLE = 'CHANGE-TASK-TITLE';

export type TasksActionType = RemoveTaskAT | AddTaskAT | ChangeTaskStatusAT | ChangeTaskTitleAT | AddTodolistAT | RemoveTodolistAT

export type RemoveTaskAT = ReturnType<typeof removeTaskAC>
export type AddTaskAT = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>


export const tasksReducer = (tasks: TasksStateType, action: TasksActionType): TasksStateType => {
    switch (action.type) {
        case REMOVE_TASK:
            return {
                ...tasks,
                [action.todolistID]: tasks[action.todolistID].filter((tl) => tl.id !== action.taskID)
            }
        case ADD_TASK: {
            return {
                ...tasks,
                [action.todolistID]: [{
                    id: action.taskID,
                    title: action.title,
                    isDone: false
                }, ...tasks[action.todolistID]]
            }
        }
        case CHANGE_TASK_STATUS: {
            return {
                ...tasks,
                [action.todolistID]: tasks[action.todolistID].map((task) => task.id === action.taskID ? {
                    ...task,
                    isDone: action.isDone
                } : task)
            }
        }
        case CHANGE_TASK_TITLE: {
            return {
                ...tasks,
                [action.todolistID]: tasks[action.todolistID].map((task) => task.id === action.taskID ? {
                    ...task,
                    title: action.title
                } : task)
            }
        }
        case ADD_TODOLIST: {
            return {
                ...tasks,
                [action.todolistID]: []
            }
        }
        case REMOVE_TODOLIST: {
            const copyTasks = {...tasks};
            delete copyTasks[action.todolistID]
            return copyTasks

            // const {[action.todolistID]: [], ...rest} = {...tasks}
            // return rest
        }
        default:
            return tasks;
    }
}


export const removeTaskAC = (todolistID: string, taskID: string) => ({
    type: REMOVE_TASK, // Конкретное значение, а не любая строка
    todolistID,
    taskID,
} as const)

export const addTaskAC = (todolistID: string, taskID: string, title: string) => ({
    type: ADD_TASK,
    todolistID,
    taskID,
    title,
} as const)

export const changeTaskStatusAC = (todolistID: string, taskID: string, isDone: boolean) => ({
    type: CHANGE_TASK_STATUS,
    todolistID,
    taskID,
    isDone,
} as const)

export const changeTaskTitleAC = (todolistID: string, taskID: string, title: string) => ({
    type: CHANGE_TASK_TITLE,
    todolistID,
    taskID,
    title,
} as const)