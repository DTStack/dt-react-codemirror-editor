import * as React from 'react';
import { storiesOf } from '@storybook/react';

const stories = storiesOf('欢迎使用', module);
stories.add('欢迎页', () => {
    return (
        <div className='story_wrapper'>
            <h2>何时使用</h2>
            <p>描述使用场景</p>
            <h2>示例</h2>
            <p>添加代码示例</p>
        </div>
    )
}, {
    info: {
        text: `
        代码示例：
        ~~~js
        ~~~
        `
    }
})
