import {tasksReducer} from '../reducers/tasks-reducer'
import {todolistReducer} from '../reducers/todolist-reducer'
import {combineReducers, legacy_createStore as createStore} from 'redux'

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistReducer
})


export const store = createStore(rootReducer);
// определить автоматически тип всего объекта состояния

export type AppRootStateType = ReturnType<typeof rootReducer>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;




