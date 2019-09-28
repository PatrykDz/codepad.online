import React, {FunctionComponent, useState, EventHandler, CSSProperties, useEffect, useContext} from 'react'
import styled from 'styled-components';
import MonacoEditor, {ChangeHandler} from 'react-monaco-editor';
import {Nav, INavLink} from 'office-ui-fabric-react/lib/Nav';
import {snippetService} from '../../services/snippetService'

const CreateSnippetPage: FunctionComponent = (props) => {

    const [code, setCode] = useState('');
    const [editor, setEditor] = useState(undefined);

    useEffect(() => {
        snippetService.getSnippet('n1234')
            .then(res => {
                changeEditorValue(res.data.content);
            })
            .catch(err => console.error(err));
    }, [editor])

    const options = {
        selectOnLineNumbers: true,
        automaticLayout: true
    };

    const editorDidMount = (editor: any) => {
        if (editor) {
            setEditor(editor);
        }
    };

    const changeEditorValue = (value: string) => {
        if (editor) {
            // @ts-ignore
            editor.setValue(value);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if ((window.navigator.platform.match("Mac")
            ? e.metaKey : e.ctrlKey)
            && e.key == 's') {
            e.preventDefault();
            handleSave();
        }
    }

    const handleSave = () => {
        console.log(code);
        snippetService.createSnippet("n1", {
            content: code
        });
    }

    const onChange = (newValue: string): any => {
        setCode(newValue);
    }

    const containerStyle: CSSProperties = {
        display: 'grid',
        width: '100%',
        height: '100vh',
        gridTemplateColumns: '2fr 10fr'
    };

    const onLinkClick = () => console.log('click');

    return (
        <React.Fragment>
            <div style={containerStyle} onKeyDown={handleKeyDown}>
                <Nav
                    onLinkClick={onLinkClick}
                    selectedKey="key1"
                    expandButtonAriaLabel="Expand or collapse"
                    selectedAriaLabel="Selected"
                    ariaLabel="Nav basic example"
                    styles={{
                        root: {
                            boxSizing: 'border-box',
                            overflowY: 'auto'
                        }
                    }}
                    groups={[
                        {
                            links: [
                                {
                                    name: 'Documents',
                                    url: '',
                                    links: [
                                        {
                                            name: 'Current Document',
                                            url: '',
                                            key: 'key1',
                                            target: '_blank',
                                            isExpanded: true
                                        },
                                        {
                                            name: '+ New Document',
                                            url: '',
                                            disabled: true,
                                            key: 'key2',
                                            target: '_blank'
                                        }
                                    ],
                                    isExpanded: true
                                },
                            ]
                        }
                    ]}
                />
                <MonacoEditor
                    width="100%"
                    height="100%"
                    language="typescript"
                    theme="vs-dark"
                    value={code}
                    options={options}
                    editorDidMount={editorDidMount}
                    onChange={onChange}
                />
            </div>
        </React.Fragment>
    )
}

export default CreateSnippetPage;