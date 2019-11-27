import React, {FunctionComponent} from 'react'
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
   align-self: center;
   font-size: 14px;
`


const LanguageSelector = () => {
    return(
        <div style={{color: "red"}}>
            TS
        </div>
    )
}

const StyledLanguageSelector = styled(LanguageSelector)`
  color: red;
`

const SideNav : FunctionComponent<ISideNavProps> = (props) => {
    return (
        <React.Fragment>
            <StyledSideNav>
                <StyledSideNavItem>
                    <StyledTitle>
                        Current document
                        <StyledLanguageSelector />
                    </StyledTitle>
                </StyledSideNavItem>
            </StyledSideNav>
        </React.Fragment>
    )
}

export default SideNav