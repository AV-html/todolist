import React, {useEffect, useState} from 'react'
import {todoListAPI} from '../../api/todolist-api';

export default {
    title: 'API/CRUD',
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoListAPI.getTodolists()
            .then(res => setState(res.data))
    }, [])
    return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoListAPI.createTodolist('Tester')
            .then(res => {
                setState(res.data)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)

    const id = "5c6bce25-16b6-47de-84cb-d721d83f026e"
    useEffect(() => {
        todoListAPI.removeTodolist(id)
            .then(res => setState(res.data))
    }, [])
    return <div> {JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)

    const id = "c57985bc-b362-4d1f-99c7-69c8a105eec4"
    const title = '!U Tester List!'

    useEffect(() => {
        todoListAPI.updateTodolist(id, title)
            .then(res => setState(res.data))
    }, [])
    return <div> {JSON.stringify(state)}</div>
}

