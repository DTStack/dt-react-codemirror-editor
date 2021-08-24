import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { MarkdownRender } from 'dt-react-component';

import './style.scss';
import { notShowProps } from './utils';
import { PropsTable } from './propsTable';

import CodeMirrorEditor, { createLinkMark, createLog, createTitle } from '../lib';
import '../lib/codemirror/style.css'

import propDefinitions from './editorPropsDefinition';

const changelogMd = require('../CHANGELOG.md');
const readmeMd = require('../README.md');

const defaultValue = `
select * from test;
`

export const stories = storiesOf('CodeMirrorEditor', module);

stories.add('开始', () => {
    return (
        <div className='story_wrapper'>
            <MarkdownRender text={readmeMd && readmeMd.default} />
        </div>
    )
}, {
    info: {
        header: false,
        ...notShowProps(false, [MarkdownRender]).info
    },
})

stories.add('示例 - 基本使用', () => {
    return (
        <div className='story_wrapper'>
            <h1>基本使用</h1>
            <p>这里默认 mode 为 sql:</p>
            <CodeMirrorEditor 
                value={defaultValue}
                options={{ mode: 'sql' }}
            />
        </div>
    )
}, {
    info: {
        header: false,
        text: `
        代码示例：
        ~~~js
        import CodeMirrorEditor from 'dt-react-codemirror-editor';
        import 'dt-react-codemirror-editor/lib/codemirror/style.css';
        <CodeMirrorEditor value={defaultValue} options={{ mode: 'sql' }}/>
        ~~~
        `,
        TableComponent: () => PropsTable({ propDefinitions })
    }
})

stories.add('示例 - 自定义日志（dtlog）', () => {
    let log = `
${createTitle('Log title')}
${createLog('info', 'info')}
${createLog('warning', 'warning')}
${createLog('error', 'error')}
${createLinkMark({ href: 'http://www.google.com', download: '' })}
`;
    return (
        <div className='story_wrapper'>
            <h1>自定义日志模式</h1>
            <p>这是一个简单的日志模式扩展，可以应用在一些实时的日志打印场景。</p>
            <CodeMirrorEditor 
                value={log}
                sync={true}
                cursorAlwaysInEnd={true} // 如果是实时的日志打印，建议开启此选项，保证光标始终在文档底部
                options={{ readOnly: true, mode: 'dtlog' }}
            />
        </div>
    )
}, {
    info: {
        header: false,
        text: `
        代码示例：
        ~~~js
        import CodeMirrorEditor, { createLinkMark, createLog, createTitle } from 'dt-react-codemirror-editor';
        import 'dt-react-codemirror-editor/lib/codemirror/style.css';
        let log = \`
            \${createTitle('Log title')}
            \${createLog('info', 'info')}
            \${createLog('warning', 'warning')}
            \${createLog('error', 'error')}
            \${createLinkMark({ href: 'http://www.google.com', download: '' })}
        \`;
        <CodeMirrorEditor 
            value={log}
            sync={true} // Whether update editor value when props value changed
            cursorAlwaysInEnd={true} // 如果是实时的日志打印，建议开启此选项，保证光标始终在文档底部
            options={{ readOnly: true, mode: 'dtlog' }}
        />
        ~~~
        `,
        TableComponent: () => PropsTable({ propDefinitions })
    }
})

stories.add('示例 - 事件监听', () => {
    return (
        <div className='story_wrapper'>
            <h1 className="strory-dt_easy_select_p">事件监听</h1>
            <p>
                <strong>dt-react-codemirror</strong> 仅仅通过 props 暴露了几个常见的事件，具体 <strong>codemirror</strong> 更多的事件，
                可以通过<strong>editorRef</strong>获取编辑器对象，自己监听，具体文档<a href="https://codemirror.net/doc/manual.html#events">参考</a>。
            </p>
            <CodeMirrorEditor 
                value={`const language = 'javascript';`}
                options={{ mode: 'javascript' }}
                onChange={(prev, next, doc) => {
                    console.log('onChange,', prev, next, doc)
                }}
                onFocus={(prev, next, doc) => {
                    console.log('onFocus,', prev, next, doc)
                }}
                focusOut={(prev, next, doc) => {
                    console.log('focusOut,', prev, next, doc)
                }}
                cursorActivity={(prev, next, doc) => {
                    console.log('cursorActivity,', prev, next, doc)
                }}
                editorRef={(editor) => {
                    console.log('editor:', editor)
                }}
            />
        </div>
    )
}, {
    info: {
        header: false,
        text: `
        代码示例：
        ~~~js
        import CodeMirrorEditor from 'dt-react-codemirror-editor';
        import 'dt-react-codemirror-editor/lib/codemirror/style.css';
        <CodeMirrorEditor 
            value={'const language = 'javascript';'}
            options={{ mode: 'javascript' }}
            onChange={(prev, next, doc) => {
                console.log('onChange,', prev, next, doc)
            }}
            onFocus={(prev, next, doc) => {
                console.log('onFocus,', prev, next, doc)
            }}
            focusOut={(prev, next, doc) => {
                console.log('focusOut,', prev, next, doc)
            }}
            cursorActivity={(prev, next, doc) => {
                console.log('cursorActivity,', prev, next, doc)
            }}
            editorRef={(editor) => {
                console.log('editor:', editor)
            }}
        />
        ~~~
        `,
        TableComponent: () => PropsTable({ propDefinitions })
    }
})


stories.add('更新日志', () => {
    return (
        <div className='story_wrapper'>
            <MarkdownRender text={changelogMd && changelogMd.default} />
        </div>
    )
}, {
    info: {
        header: false,
        ...notShowProps(false, [MarkdownRender]).info
    },
})
