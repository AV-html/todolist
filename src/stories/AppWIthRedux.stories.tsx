import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import AppRedux from '../AppRedux';
import {ReduxStoreProviderDecorator} from './ReduxStoreProviderDecorator';


export default {
    title: 'Todolists/AppRedux',
    component: AppRedux,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof AppRedux>;

// 1 вариант
// const Template: ComponentStory<typeof AppRedux> = (args) => <Provider store={store}>
//     <AppRedux />
// </Provider>;

// 2 вариант decorators: [ReduxStoreProviderDecorator]
const Template: ComponentStory<typeof AppRedux> = (args) => <AppRedux />



export const TaskIsDoneStory = Template.bind({});
TaskIsDoneStory.args = {};


