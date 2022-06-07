import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {AddBox} from '@material-ui/icons';
import {IconButton, TextField} from '@material-ui/core';


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
            <TextField
                color={'primary'}
                size={'small'}
                variant={'outlined'}
                label={'Title'}
                error={Boolean(error)}
                helperText={error && 'Invalid Error'}
                value={title}
                onChange={onChangeHandler}
                onKeyDown={onKeyPressHandler}

                // className={error ? 'error' : ''}
            />

            <IconButton onClick={addItem} size={'small'} color="primary">
                <AddBox/>
            </IconButton>
            {/*{error && <div className="error-message">{error}</div>}*/}
        </div>
    );
}