import React, {ChangeEvent, KeyboardEvent, useState} from 'react';


type PropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: PropsType) {

    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const addItem = () => {
        if (title.trim() !== '') {
            props.addItem(title.trim());
            setTitle('');
        } else {
            setError('Title is required');
        }
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === 'Enter') {
            addItem();
        }
    }

    return (
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyPressHandler}
                   className={error ? 'error' : ''}
            />

            <button onClick={addItem}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
}