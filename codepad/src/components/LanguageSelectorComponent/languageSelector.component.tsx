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
  font-family: ${Theme.font.default.fontFamily};
  font-weight: ${Theme.font.default.fontWeight};
  font-size: 16px;
  background-color: ${Theme.colors.primary.violetRed};
  list-style: none;
  margin: 0;
  padding: 0;

  ${({ show }) => !show && `display: none`}
`

const StyledLanguageSelectorText = styled.span`
  line-height: 42px; // WIP: make flexible later
`

const LanguageSelector = (props: any) => {
    const [showLanguages, setShowLanguages] = useState(false)

    return(
        <React.Fragment>
            <div onClick = {() => setShowLanguages(!showLanguages)} {...props}>
                <StyledLanguageSelectorText>{props.currentLanguage.displayName}</StyledLanguageSelectorText>
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
