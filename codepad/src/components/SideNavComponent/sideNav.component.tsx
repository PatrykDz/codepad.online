import React, {FunctionComponent, useState} from 'react'
import styled from "styled-components";

type ISideNavProps = {

}

const StyledSideNav = styled.div`
  display: flex;  
  background-color: white;
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
    background-color: #A9A9A9;
  }
`

const LanguagesDropdown = (props: any) => {
    const languages = ['TS', 'C#', 'C']

    return(
        <ul {...props}>
            {languages.map(l =>
                <StyledLi onClick={() => props.setCurrentLanguage(l)}>
                    {l}
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
                {props.currentLanguage}
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
    const [currentLanguage, setCurrentLanguage] = useState('TS')

    return (
        <React.Fragment>
            <StyledSideNav>
                <StyledSideNavItem>
                    <StyledTitle>
                        <span>Current document</span>
                        <StyledLanguageSelector
                            currentLanguage={currentLanguage}
                            setCurrentLanguage={setCurrentLanguage} />
                    </StyledTitle>
                </StyledSideNavItem>
            </StyledSideNav>
        </React.Fragment>
    )
}

export default SideNav