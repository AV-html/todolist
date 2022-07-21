import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import {Task} from '../Task';
import {Provider} from 'react-redux';
import {store} from '../state/store';


export default {
    title: 'Todolists/Task',
    component: Task,

    args: {
        // Аргументы попадут во все истории
        todolistID: '228'
    }
} as ComponentMeta<typeof Task>;

const Template: ComponentStory<typeof Task> = (args) => <Provider store={store}>
    <Task {...args} />
</Provider>;


export const TaskIsDoneStory = Template.bind({});
TaskIsDoneStory.args = {
    task: {title: 'title', id: '1081', isDone: true},
};

export const TaskIsNotDoneStory = Template.bind({});
TaskIsNotDoneStory.args = {
    task: {title: 'title', id: '1082', isDone: false},
};
