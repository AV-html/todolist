import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '98c943b3-86e8-48f8-9f2b-2ff92a9e5ed9'
    }
})


export const todoListAPI = {
    getTodolists() {
        return instance.get<TodolistType[]>('todo-lists/')
    },

    createTodolist(title: string) {
        return instance.post<BaseTodolistType<{item: TodolistType}>>(`todo-lists/`, {title})
    },

    removeTodolist(todolistId: string) {
        return instance.delete<BaseTodolistType>(`todo-lists/${todolistId}`)
    },

    updateTodolist(todolistId: string, title: string) {
        return instance.put<BaseTodolistType>(`todo-lists/${todolistId}`, {title})
    }
}


type TodolistType = {
    id: string,
    title: string,
    addedDate: string
    order: number,
}

type BaseTodolistType<T = {}> = {
    resultCode: number
    messages: string[]
    data: T
    fieldsErrors: string[]
}


