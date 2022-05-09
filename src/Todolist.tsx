import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type FilterValueType = 'all' | 'active' | 'completed'



type inArrayType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    title: string
    tasks: Array<inArrayType>
    removeTask: (id: string) => void
    addTask: (title: string) => void
}

export const Todolist = ( {addTask, removeTask, ...props }: PropsType) => {

    const [filterName, setFilterName] = useState<FilterValueType>('all');



    let taskList = props.tasks;

    if (filterName === 'active') {
        taskList = props.tasks.filter((task) => !task.isDone)
    }
    if (filterName === 'completed') {
        taskList = props.tasks.filter((task) => task.isDone)
    }



    const [title, setTitle] = useState('');

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value);
    }

    const addTaskHandler = () => {
        addTask(title);
        setTitle('');
    }

    const onKeyHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        // console.log(event.charCode);
        // console.log(event.key);
        if (event.key === 'Enter') {
            addTaskHandler();
        }
    }

    const changeFilterHandler = (filterValue: FilterValueType) => {
        setFilterName(filterValue);
    }

    // const removeTaskHandler = (el: string) => {
    //     props.removeTask(el)
    // }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeHandler}
                    onKeyDown={onKeyHandler}
                />

                <button onClick={() => {
                    addTaskHandler()
                }}>+
                </button>
            </div>
            <ul>
                {taskList.map((el) => {
                    const removeTaskHandler = () => {
                        removeTask(el.id)
                    }
                    return (
                        <li key={el.id}>
                            <button onClick={
                                removeTaskHandler
                            }>
                                X
                            </button>

                            <input type="checkbox" checked={el.isDone}/>
                            <span>{el.title}</span>
                        </li>
                    )
                })}
            </ul>

            <div>
                <button onClick={
                    () => {changeFilterHandler('all')}
                }>All
                </button>
                <button onClick={
                    () => {changeFilterHandler('active')}
                }>Active
                </button>
                <button onClick={
                    () => {changeFilterHandler('completed')
                }}>Completed
                </button>
            </div>
        </div>
    );
}