import React, {FunctionComponent, useState, EventHandler} from 'react'
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

    const StyledContainer = styled.div`
        display: grid;
        width: 100%;
        height: 100vh;
        
        grid-template-columns: 2fr 10fr;
    `

    const onLinkClick = () => console.log('click');

    return (
        <React.Fragment>
            <StyledContainer>
                <Nav
                    onLinkClick={onLinkClick}
                    selectedKey="key3"
                    expandButtonAriaLabel="Expand or collapse"
                    selectedAriaLabel="Selected"
                    ariaLabel="Nav basic example"
                    styles={{
                        root: {
                            boxSizing: 'border-box',
                            border: '1px solid #eee',
                            overflowY: 'auto'
                        }
                    }}
                    groups={[
                        {
                            links: [
                                {
                                    name: 'Home',
                                    url: 'http://example.com',
                                    links: [
                                        {
                                            name: 'Activity',
                                            url: 'http://msn.com',
                                            key: 'key1',
                                            target: '_blank'
                                        },
                                        {
                                            name: 'MSN',
                                            url: 'http://msn.com',
                                            disabled: true,
                                            key: 'key2',
                                            target: '_blank'
                                        }
                                    ],
                                    isExpanded: true
                                },
                                {
                                    name: 'Documents',
                                    url: 'http://example.com',
                                    key: 'key3',
                                    isExpanded: true,
                                    target: '_blank'
                                }
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
                    // editorDidMount={::this.editorDidMount}
                />
            </StyledContainer>
        </React.Fragment>
    )
}

export default CreateSnippetPage;