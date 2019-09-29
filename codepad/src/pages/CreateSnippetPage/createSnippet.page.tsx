import React, {FunctionComponent, useState, EventHandler, CSSProperties, useEffect, useContext} from 'react'
import styled from 'styled-components';
import MonacoEditor, {ChangeHandler} from 'react-monaco-editor';
import {Nav, INavLink} from 'office-ui-fabric-react/lib/Nav';
import {snippetService} from '../../services/snippetService'

interface ICreateSnippetPageProps {
    match: any
}

const CreateSnippetPage: FunctionComponent<ICreateSnippetPageProps> = (
    props) => {

    const [code, setCode] = useState('');
    const [editor, setEditor] = useState(undefined);

    useEffect(() => {
        const urlId = props.match.params.urlId || ''
        snippetService.getSnippet(urlId)
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
            // @ts-ignore
            editor
                ._standaloneKeybindingService
                .addDynamicKeybinding('-expandLineSelection');
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
        const urlId = props.match.params.urlId || ''
        snippetService.createSnippet(urlId, {
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