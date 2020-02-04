import React, {FunctionComponent, useState} from 'react'
import styled from "styled-components";
import Language from "../../common/types/language";
import Theme from '../../common/theme'
import {StyledLanguageSelector} from "../LanguageSelectorComponent/languageSelector.component";

type ISideNavProps = {
    onLanguageChange: (language: Language) => any
}

type IActiveProps = {
    active?: boolean
}

type ISideNavItemProps = {
    className?: any,
    active?: boolean,
    currentLanguage: Language,
    setCurrentLanguage: (language: Language) => any
}

const StyledSideNav = styled.div`
  width: 430px; // WIP: adjust to grid. Hardcoded for now!!!
  display: flex;
  flex-direction: column;
  background-color: ${Theme.colors.primary.gray};
`

const StyledTitleSpan = styled.span<IActiveProps>`
  margin: auto auto auto 40px;
  font-size: 21px;
  color: ${({ active }) => active ? Theme.colors.primary.white : Theme.colors.primary.kashmirBlue};
`

const SideNavItem = (props: ISideNavItemProps) => {
    return (
        <React.Fragment>
            <StyledTitle className={props.className}>
                <StyledTitleSpan active={props.active}>Current document</StyledTitleSpan>
                <StyledLanguageSelector
                    currentLanguage={props.currentLanguage}
                    setCurrentLanguage={props.setCurrentLanguage}/>
            </StyledTitle>
        </React.Fragment>
    );
}

const StyledSideNavItem = styled(SideNavItem)`
  display: flex;
  margin: 5px 20px 5px 5px;
  background-color: ${({ active }) => active ? Theme.colors.primary.primaryBlue : Theme.colors.primary.white};
  height: 70px;
  border-radius: 10px;
`

const StyledTitle = styled.div`
   display: flex;
   font-size: 16px;
   justify-content: space-between;
   align-self: center;
   align-items: center;
   padding-right: 10px;
`

const SideNav: FunctionComponent<ISideNavProps> = (props) => {
    const [currentLanguage, setCurrentLanguage] = useState<Language>({value: 'typescript', displayName: 'TS'})

    const updateCurrentLanguage: (language: Language) => any = (language) => {
        setCurrentLanguage(language)
        props.onLanguageChange(language)
    }

    return (
        <React.Fragment>
            <StyledSideNav>
                <StyledSideNavItem
                    currentLanguage={currentLanguage}
                    setCurrentLanguage={updateCurrentLanguage} />
                <StyledSideNavItem
                    active={true}
                    currentLanguage={currentLanguage}
                    setCurrentLanguage={updateCurrentLanguage} />
            </StyledSideNav>
        </React.Fragment>
    )
}

export default SideNav