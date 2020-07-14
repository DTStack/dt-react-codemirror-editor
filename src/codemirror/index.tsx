import * as React from 'react'

import { defaultEditorOptions } from './config'

import CodeMirror from 'codemirror';
import './languages/log';
import './languages/simpleLog';
import 'codemirror/lib/codemirror.css'
import 'codemirror/addon/lint/lint.css'
import 'codemirror/addon/scroll/simplescrollbars.css'
import './style'
import { getLinkMark, getLogMark } from './utils'

require('codemirror/mode/sql/sql')
require('codemirror/mode/python/python')
require('codemirror/mode/javascript/javascript')
require('codemirror/mode/properties/properties')
require('codemirror/addon/display/placeholder')
require('codemirror/addon/edit/matchbrackets')
require('codemirror/addon/scroll/simplescrollbars')

type EditorEventCallback = (prevValue: string, nextValue: string, editorDoc: CodeMirror.Doc) => void;

interface CodeMirrorEditorProps {

    value: string;
    /**
     * The cursor position
     */
    cursor?: CodeMirror.Position;
    /**
     * Whether sync the editor value when props value changed
     */
    sync?: boolean;
    /**
     * Editor option
     */
    options?: CodeMirror.EditorConfiguration;
    /**
     * Always show cursor in the end.
     * This option be used when streaming output, such as typing logs.
     */
    cursorAlwaysInEnd?: boolean;
    editorRef?: (inst: CodeMirror.Editor) => void;
    cursorActivity?: EditorEventCallback;
    onChange?: EditorEventCallback;
    onFocus?: EditorEventCallback;
    focusOut?: EditorEventCallback;

    className?: string;
    style?: React.CSSProperties;

}

class CodeMirrorEditor extends React.Component<CodeMirrorEditorProps, any> {
    private _editorRef: HTMLTextAreaElement;
    private _codeMirrorInstance: CodeMirror.Editor;

    componentDidMount () {
        const ele = this._editorRef;
        if (!ele) return;

        const {
            value, onChange, onFocus, cursor, options,
            focusOut, cursorActivity, editorRef
        } = this.props;

        const editorConfig = Object.assign({}, defaultEditorOptions, options);

        this._codeMirrorInstance = CodeMirror.fromTextArea(ele, editorConfig);
        const editorIns = this._codeMirrorInstance;
        this.renderTextMark();

        // 设置 cursor 位置
        if (cursor) editorIns.setCursor(cursor)

        editorIns.on('change', (doc: CodeMirror.Doc) => {
            if (onChange) {
                onChange(value, doc.getValue(), doc)
            }
        })
        editorIns.on('focus', (doc: CodeMirror.Doc) => {
            if (onFocus) {
                onFocus(value, doc.getValue(), doc)
            }
        })

        editorIns.on('blur', (doc: CodeMirror.Doc) => {
            if (focusOut) {
                focusOut(value, doc.getValue(), doc)
            }
        })

        editorIns.on('cursorActivity', (doc: CodeMirror.Doc) => {
            if (cursorActivity) {
                cursorActivity(value, doc.getValue(), doc)
            }
        })
        if (editorRef) {
            editorRef(editorIns);
        }
    }

    static fromTextArea(ele: HTMLTextAreaElement, options: CodeMirror.EditorConfiguration): any {
        throw new Error("Method not implemented.");
    }

    // eslint-disable-next-line
    UNSAFE_componentWillReceiveProps(nextProps: any) {
        const editorIns = this._codeMirrorInstance;
        const { value, sync, cursor, cursorAlwaysInEnd, options = {} } = nextProps;
        if (options) {
            editorIns.setOption('readOnly', options.readOnly)
        }

        if (this.props.value !== value) {
            if (cursor) editorIns.setCursor(cursor)
            if (sync) {

                const scrollInfo = editorIns.getScrollInfo();
                /**
                 * 判断滚动条是不是在底部
                 */
                const isInBottom = (scrollInfo.top + scrollInfo.clientHeight) - scrollInfo.height > -10;
                console.log(isInBottom);
                if (!value) {
                    editorIns.setValue('')
                } else {
                    editorIns.setValue(value);
                }
                if (cursorAlwaysInEnd) {
                    editorIns.setCursor(editorIns.lineCount());
                } else if (!isInBottom) {
                    /**
                    * 不在底部并且不设置自动滚到底部，则滚到原来位置
                    */
                    editorIns.scrollTo(scrollInfo.left, scrollInfo.top)
                } else if (isInBottom) {
                    /**
                     * 在底部，则自动到底部
                     * 需要等setValue这个动作结束之后，再获取内容的高度。
                     */
                    Promise.resolve().then(() => {
                        let nowScrollInfo = editorIns.getScrollInfo();
                        editorIns.scrollTo(nowScrollInfo.left, nowScrollInfo.height)
                    })
                }
            }
            this.renderTextMark();
        }
    }
    renderTextMark () {
        const editorIns = this._codeMirrorInstance;

        const marks = editorIns.getAllMarks();
        for (let mark of marks) { // 重置marks
            mark.clear();
        }
        const value = editorIns.getValue();
        const linkMarks: any = [].concat(getLinkMark(value)).concat(getLogMark(value));
        for (let _i = 0; _i < linkMarks.length; _i++) {
            let mark = linkMarks[_i];
            editorIns.markText(
                editorIns.posFromIndex(mark.start),
                editorIns.posFromIndex(mark.end),
                { replacedWith: mark.node }
            )
        }
    }

    render () {
        const { className, style } = this.props
        let renderClass = `code-editor ${className || ''}`;
        let renderStyle: React.CSSProperties = {
            position: 'relative'
        };

        Object.assign(renderStyle, style);

        return (
            <div
                className={renderClass}
                style={renderStyle}>
                <textarea
                    ref={(e: HTMLTextAreaElement) => { this._editorRef = e }}
                    defaultValue={this.props.value || ''}
                />
            </div>
        )
    }
}

export default CodeMirrorEditor
