import {FilterValuesType, TodoListType} from '../App';
import {v1} from 'uuid';

export const REMOVE_TODOLIST = 'REMOVE-TODOLIST'
export const ADD_TODOLIST = 'ADD-TODOLIST'
export const CHANGE_FILTER = 'CHANGE-FILTER'
export const CHANGE_TITLE = 'CHANGE-TITLE'

export type RemoveTodolistAT = {
    type: typeof REMOVE_TODOLIST
    todolistID: string
}
export type AddTodolistAT = {
    type: typeof ADD_TODOLIST
    todolistID: string
    title: string
}
export type ChangeTodolistFilterAT = {
    type: typeof CHANGE_FILTER
    todolistID: string
    filter: FilterValuesType
}
export type ChangeTodolistTitleAT = {
    type: typeof CHANGE_TITLE
    todolistID: string
    title: string
}


export type TodolistActionType =
    RemoveTodolistAT |
    AddTodolistAT |
    ChangeTodolistFilterAT |
    ChangeTodolistTitleAT


export const todolistReducer = (todolists: Array<TodoListType>, action: TodolistActionType): Array<TodoListType> => {

    switch (action.type) {
        case REMOVE_TODOLIST:
            return todolists.filter(tl => tl.id !== action.todolistID)

        case ADD_TODOLIST:
            const newTodoList: TodoListType = {
                id: action.todolistID,
                title: action.title,
                filter: 'all'
            }
            return [...todolists, newTodoList]

        case CHANGE_FILTER:
            return todolists.map(
                (t) => t.id === action.todolistID ? {...t, filter: action.filter} : t
            )

        case CHANGE_TITLE:
            return todolists.map((tl) => tl.id === action.todolistID ? {...tl, title: action.title} : tl)

        default:
            return todolists
    }
}


export const removeTodolistAC = (todolistID: string): RemoveTodolistAT => ({type: REMOVE_TODOLIST, todolistID})

export const addTodolistAC = (title: string): AddTodolistAT => ({
    type: ADD_TODOLIST,
    todolistID: v1(),
    title
})

export const changeTodolistFilterAC = (todolistID: string, filter: FilterValuesType): ChangeTodolistFilterAT => ({
    type: CHANGE_FILTER,
    todolistID,
    filter
})
export const changeTodolistTitleAC = (todolistID: string, title: string): ChangeTodolistTitleAT => ({
    type: CHANGE_TITLE,
    todolistID,
    title
})

