import * as React from 'react';

const LeftSpan: React.SFC = (props: any) => {
    return (
        <div style={{ textAlign: 'left', padding: 8, lineHeight: '25px'}}>
            {props.children}
        </div>
    )
}

 const propDefinitions = [{
    property: 'value',
    propType: 'string',
    required: false,
    description: <LeftSpan>编辑器的文本内容</LeftSpan>,
    defaultValue: '-'
}, {
    property: 'cursor',
    propType: 'CodeMirror.Position',
    required: false,
    description: <LeftSpan>编辑器光标位置</LeftSpan>,
    defaultValue: '-'
}, {
    property: 'sync',
    propType: 'boolean',
    required: false,
    description: <LeftSpan>是否同步 props 的 value 内容到编辑器</LeftSpan>,
    defaultValue: '-'
}, {
    property: 'options',
    propType: 'CodeMirror.EditorConfiguration',
    required: false,
    description: <LeftSpan>
        编辑器配置选项，<a href="https://codemirror.net/doc/manual.html#config">参考</a>
    </LeftSpan>,
    defaultValue: 'defaultEditorOptions'
}, {
    property: 'cursorAlwaysInEnd',
    propType: 'boolean',
    required: false,
    description: <LeftSpan>光标是否总是显示在末尾</LeftSpan>,
    defaultValue: '-'
}, {
    property: 'editorRef',
    propType: 'CodeMirror.Editor',
    required: false,
    description: <LeftSpan>引用编辑器实例</LeftSpan>,
    defaultValue: '-'
}, {
    property: 'cursorActivity',
    propType: '(prevValue: string, nextValue: string, editorDoc: CodeMirror.Doc) => void',
    required: false,
    description: <LeftSpan>光标活动时事件</LeftSpan>,
    defaultValue: '-'
}, {
    property: 'onChange',
    propType: '(prevValue: string, nextValue: string, editorDoc: CodeMirror.Doc) => void',
    required: false,
    description: <LeftSpan>编辑器内容改变</LeftSpan>,
    defaultValue: '-'
}, {
    property: 'onFocus',
    propType: '(prevValue: string, nextValue: string, editorDoc: CodeMirror.Doc) => void',
    required: false,
    description: <LeftSpan>编辑器聚焦事件</LeftSpan>,
    defaultValue: '-'
}, {
    property: 'focusOut',
    propType: '(prevValue: string, nextValue: string, editorDoc: CodeMirror.Doc) => void',
    required: false,
    description: <LeftSpan>编辑器焦点跳出事件</LeftSpan>,
    defaultValue: '-'
}]

export default propDefinitions;
