import React, {FunctionComponent} from 'react'
import styled from 'styled-components'

import {snippetService} from '../../services/snippetService'
import Spinner from '../../components/Spinner/index'

const StyledContainer = styled.div`
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
`

const HomePage: FunctionComponent = (props) => {

snippetService.getNewSnippetUrlId()
    .then((res)=> {
        console.log(res.data);
        window.location.href = res.data.urlId;
    });

console.log(process.env);


return (
    <React.Fragment>
        <StyledContainer>
            <Spinner label="Loading your personal notepad..."/>
        </StyledContainer>
    </React.Fragment>
)
}

export default HomePage