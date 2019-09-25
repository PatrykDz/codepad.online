import React, { FunctionComponent, useState, EventHandler } from 'react'
import styled from 'styled-components';
import MonacoEditor, { ChangeHandler } from 'react-monaco-editor';

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
    };

    const onChange = (newValue: string): any => {
        setCode(newValue);
    }

    return (
        <React.Fragment>
            Working

        <MonacoEditor
                width="800"
                height="600"
                language="typescript"
                theme="vs-dark"
                value={code}
                options={options}
                onChange={onChange}
                // editorDidMount={::this.editorDidMount}
            />

        <button onClick={() => console.log(code)}>Log Code</button>

        </React.Fragment>
    )
}

export default CreateSnippetPage;