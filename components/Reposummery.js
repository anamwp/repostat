import React from 'react'
import Totalcommit from './Totalcommit';
import Weeklycommit from './Weeklycommit';
import Todaycommit from './Todaycommit';
import Yesterdaycommit from './Yesterdaycommit';

export default function Reposummery(props) {
    const repo = props.repo;
    return (
        <div className="grid gap-0 grid-cols-4 md:grid-cols-4 sm:grid-cols-1 mt-10 rounded overflow-hidden">
            <Totalcommit repo={repo} />
            <Weeklycommit repo={repo} />
            <Todaycommit repo={repo} />
            <Yesterdaycommit repo={repo} />
        </div>
    )
}
