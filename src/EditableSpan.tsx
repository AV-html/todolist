import React, {ChangeEvent, useState} from 'react';


type PropsType = {
    title: string
    updateTitle: (newTitle: string) => void
    classes?: string
}

export function EditableSpan(props: PropsType) {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title);

    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        setEditMode(false)
        props.updateTitle(title)
    }

    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
        editMode
            ? <input
                value={title}
                autoFocus={true}
                onBlur={offEditMode}
                onChange={onChangeSetTitle}
            />
            : <span onDoubleClick={onEditMode} className={props.classes}>{props.title}</span>
    );
}