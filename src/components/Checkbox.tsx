import React, {ChangeEvent} from 'react';


type PropsType = {
    callback: (isDone: boolean) => void
    isDone: boolean
}

export const Checkbox: React.FC<PropsType> = (props) => {
    const changeIsDoneHandler = (event: ChangeEvent<HTMLInputElement>) => {
        props.callback(event.currentTarget.checked);
    }

    return (
        <input onChange={changeIsDoneHandler} type="checkbox" checked={props.isDone}/>
    );
}
