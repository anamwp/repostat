import React from 'react'
import styled from 'styled-components'
import Totalcommit from './Totalcommit';
import Weeklycommit from './Weeklycommit';
import Todaycommit from './Todaycommit';
import Yesterdaycommit from './Yesterdaycommit';

const ContentWrapper = styled.div`
    width:100%;
    margin:0 auto;
    display:grid;
    grid-template-columns:repeat(4, 1fr);
    @media(max-width:768px){
        width:100%;
        margin: 0 auto;
        padding:15px;
    }
`

export default function Reposummery(props) {
    const repo = props.repo;
    return (
        <ContentWrapper>
            <Totalcommit repo={repo} />
            <Weeklycommit repo={repo} />
            <Todaycommit repo={repo} />
            <Yesterdaycommit repo={repo} />
        </ContentWrapper>
    )
}
