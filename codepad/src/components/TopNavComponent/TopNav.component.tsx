import React from 'react'
import styled from "styled-components";
import Theme from "../../common/theme";

type TopNavProps = {
    className?:string
}

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 10fr;
`

const StyledFirstSection = styled.div`
  grid-column: 1/2;
  background-color: ${Theme.colors.primary.lightBlue}
`

const StyledSecondSection = styled.div`
  grid-column: 2/4;
  background-color: ${Theme.colors.primary.primaryBlue}
`

const StyledCaption = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 21px;
  font-family: ${Theme.font.default.fontFamily};
  font-weight: 900; /*${Theme.font.default.fontWeight}; */
  color: ${Theme.colors.primary.white}
`

const TopNav = (props: TopNavProps) => {
    return (
        <React.Fragment>
            <StyledContainer className={props.className}>
                <StyledFirstSection>
                    <StyledCaption>DOCUMENTS</StyledCaption>
                </StyledFirstSection>
                <StyledSecondSection />
            </StyledContainer>
        </React.Fragment>
    )
}

export const StyledTopNav = styled(TopNav)`
  background-color: ${Theme.colors.primary.primaryBlue};
  height: 60px;
`