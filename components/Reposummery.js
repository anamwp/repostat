import React from 'react'
import styled from 'styled-components'
import Totalcommit from './Totalcommit';
import Weeklycommit from './Weeklycommit';
import Todaycommit from './Todaycommit';
import Yesterdaycommit from './Yesterdaycommit';
import Repoinfo from './Repoinfo';

const ContentWrapper = styled.div`
    /* margin:0 auto;
    @media(max-width:768px){
        width:100%;
        margin: 0 auto;
        padding:15px;
    } */
`

export default function Reposummery(props) {
    const repo = props.repo;
    return (
        <div className="grid gap-0 grid-cols-4">
            <Totalcommit repo={repo} />
            <Weeklycommit repo={repo} />
            <Todaycommit repo={repo} />
            <Yesterdaycommit repo={repo} />
            {/* <Repoinfo repo={repo} /> */}
        </div>
    )
}
