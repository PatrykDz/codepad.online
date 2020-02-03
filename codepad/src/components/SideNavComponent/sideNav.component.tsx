import React, {FunctionComponent, useState} from 'react'
import styled from "styled-components";
import Language from "../../common/types/language";

type ISideNavProps = {
    onLanguageChange: (language: Language) => any
}

const StyledSideNav = styled.div`
  display: flex;  
  background-color: #F0F5FB;
`

const StyledSideNavItem = styled.div`
  display: flex;
  background-color: lightgray;
  height: 50px;
  width: 100%;
`

const StyledTitle = styled.div`
   display: flex;
   justify-content: space-between;
   align-self: center;
   font-size: 16px;
   width:100%;
   margin: 20px;
`

const StyledLi = styled.li`
  &:hover {
    background-color: #FFF;
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
  background-color: gray;
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

const StyledLanguageSelector = styled(LanguageSelector)`
  position: relative;
  cursor: pointer;
  color: white;
  font-size: 12px;
  padding: 5px;
  background-color: gray;
  
  &:hover {
    background-color: #A9A9A9;
  }
`

const SideNav : FunctionComponent<ISideNavProps> = (props) => {
    const [currentLanguage, setCurrentLanguage] = useState<Language>({value:'typescript', displayName:'TS'})

    const updateCurrentLanguage = (language: Language) => {
        setCurrentLanguage(language)
        props.onLanguageChange(language)
    }

    return (
        <React.Fragment>
            <StyledSideNav>
                <StyledSideNavItem>
                    <StyledTitle>
                        <span>Current document</span>
                        <StyledLanguageSelector
                            currentLanguage={currentLanguage}
                            setCurrentLanguage={updateCurrentLanguage} />
                    </StyledTitle>
                </StyledSideNavItem>
            </StyledSideNav>
        </React.Fragment>
    )
}

export default SideNav