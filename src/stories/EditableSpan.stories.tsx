import React, {useState} from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';


import {EditableSpan} from '../EditableSpan';
import {action} from '@storybook/addon-actions';


export default {
    title: 'Todolists/EditableSpan',
    component: EditableSpan,

    args: {
        // Аргументы попадут во все истории
        title: 'Title'
    },
    argTypes: {
        updateTitle: {
            description: 'Update title'
        }
    }
} as ComponentMeta<typeof EditableSpan>;

const Template: ComponentStory<typeof EditableSpan> = (args) =>  {
    const [title, setTitle] = useState('title')

    return <EditableSpan
        {...args} title={title}
        updateTitle={(title: string) => setTitle(title)}
    />
};



export const EditableSpanExample = Template.bind({});
EditableSpanExample.args = {
    updateTitle: action('Update title')
};
