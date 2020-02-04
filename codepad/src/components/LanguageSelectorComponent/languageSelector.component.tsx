import React from 'react'
import styled from "styled-components";
import {useState} from "react";
import Theme from "../../common/theme";
import Language from "../../common/types/language";


const StyledLi = styled.li`
  &:hover {
    background-color: ${Theme.colors.accent.violetRed};
  }
`

const LanguagesDropdown = (props: any) => {
    const languages : Array<Language> = [
        {
            displayName: 'TS',
            value:'typescript'
        },
        {
            displayName: 'JS',
            value:'javascript'
        },
        {
            displayName: 'C#',
            value:'csharp'
        },
        {
            displayName: 'C++',
            value:'cpp'
        },
         {
            displayName: 'JSON',
            value:'JSON'
        }
    ]

    return(
        <ul {...props}>
            {languages.map(l =>
                <StyledLi onClick={() => props.setCurrentLanguage(l)}>
                    {l.displayName}
                </StyledLi>
            )}
        </ul>
    )
}

const StyledLanguagesDropdown = styled(LanguagesDropdown)`
  position: absolute;
  left: 0;
  font-size: 16px;
  background-color: ${Theme.colors.primary.violetRed};
  list-style: none;
  margin: 0;
  padding: 0;

  ${({ show }) => !show && `display: none`}
`


const LanguageSelector = (props: any) => {
    const [showLanguages, setShowLanguages] = useState(false)

    return(
        <React.Fragment>
            <div onClick = {() => setShowLanguages(!showLanguages)} {...props}>
                {props.currentLanguage.displayName}
                <StyledLanguagesDropdown show={showLanguages} setCurrentLanguage={props.setCurrentLanguage} />
            </div>

        </React.Fragment>
    )
}

export const StyledLanguageSelector = styled(LanguageSelector)`
  display: flex;
  position: relative;
  width: 65px;
  height: 44px;
  font-size: 21px;
  color: ${Theme.colors.primary.white}
  cursor: pointer;
  padding: 5px;
  border-radius: ${Theme.borderRadius.default};
  background-color: ${Theme.colors.primary.violetRed};
  
  justify-content: center;
  vertical-align: middle;
  
  &:hover {
    background-color: ${Theme.colors.accent.violetRed};
  }
`
