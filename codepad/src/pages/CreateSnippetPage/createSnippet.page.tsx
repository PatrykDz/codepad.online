import React, {FunctionComponent, useState, EventHandler, CSSProperties, useEffect, useContext} from 'react'
import styled from 'styled-components';
import MonacoEditor from 'react-monaco-editor';
import {snippetService} from '../../services/snippetService'
import SideNav from "../../components/SideNavComponent";
import Language from "../../common/types/language";
import TopNav from "../../components/TopNavComponent";

interface ICreateSnippetPageProps {
    match: any
}

const StyledDefaultMessageContainer = styled.div`
  grid-column-start: 2;
  color: red;
`

// const DefaultMessage = () => (
//     <MessageBar messageBarType={MessageBarType.success}>
//         All changes are saved
//     </MessageBar>
// );
//
// const UnsavedChanges = (props: any) => (
//     <MessageBar
//         messageBarType={MessageBarType.warning}
//         isMultiline={false}
//         dismissButtonAriaLabel="Save"
//         actions={
//             <div>
//                 <MessageBarButton onClick={() => props.handleSave()}>Save</MessageBarButton>
//             </div>
//         }
//     >
//         You have unsaved changes. Press <Link>Ctrl + S</Link> to save.
//     </MessageBar>
// );

const CreateSnippetPage: FunctionComponent<ICreateSnippetPageProps> = (
    props) => {

    const [code, setCode] = useState('');
    const [editor, setEditor] = useState(undefined);
    const [saved, setSaved] = useState(true);
    const [currentLanguage, setCurrentLanguage] = useState({value: 'typescript', displayName:'TS'})

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
            setSaved(true);
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
        }).then(res => {
            setSaved(true)
        });
    }

    const onChange = (newValue: string): any => {
        setCode(newValue);
        setSaved(false);
    }

    const containerStyle: CSSProperties = {
        display: 'grid',
        width: '100%',
        height: '100vh',
        gridTemplateColumns: '2fr 10fr',
        gridTemplateRows: 'auto 15fr 1fr'
    };

    const onLanguageChange = (language: Language) => {
        setCurrentLanguage(language)
    }

    const StyledTopNav = styled(TopNav)`
      grid-column: 1/4
    `

    return (
        <React.Fragment>
            <div style={containerStyle} onKeyDown={handleKeyDown}>
                <StyledTopNav />
                <SideNav onLanguageChange={onLanguageChange} />
                <MonacoEditor
                    width="100%"
                    height="100%"
                    language={currentLanguage.value}
                    theme="vs-dark"
                    value={code}
                    options={options}
                    editorDidMount={editorDidMount}
                    onChange={onChange}
                />

                {/*<StyledDefaultMessageContainer>*/}
                {/*    {saved ? <DefaultMessage/> : <UnsavedChanges handleSave={() => handleSave()}/>}*/}
                {/*</StyledDefaultMessageContainer>*/}
            </div>
        </React.Fragment>
    )
}

export default CreateSnippetPage;