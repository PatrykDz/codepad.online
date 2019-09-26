import React, {FunctionComponent, useState, EventHandler, CSSProperties} from 'react'
import styled from 'styled-components';
import MonacoEditor, {ChangeHandler} from 'react-monaco-editor';
import {Nav, INavLink} from 'office-ui-fabric-react/lib/Nav';


const CreateSnippetPage: FunctionComponent = (props) => {
    const [code, setCode] = useState(`  
    // Define Typescript Interface Employee
    interface Employee {
        firstName: String;
        lastName: String;
        contractor?: Boolean;
    }

    // Use Typescript Interface Employee. 
    // This should show you an error on john 
    // as required attribute lastName is missing
    const john:Employee = {
        firstName:"John",
        // lastName:"Smith"
        // contractor:true
    }
`);

    const options = {
        selectOnLineNumbers: true,
        automaticLayout: true
    };

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
            <div style={containerStyle}>
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
                    onChange={onChange}
                />
            </div>
        </React.Fragment>
    )
}

export default CreateSnippetPage;