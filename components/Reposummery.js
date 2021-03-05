import React from 'react'
import Totalcommit from './Totalcommit';
import Weeklycommit from './Weeklycommit';
import Todaycommit from './Todaycommit';
import Yesterdaycommit from './Yesterdaycommit';

export default function Reposummery(props) {
    const repo = props.repo;
    return (
        <div className="grid gid-cols-1 sm:grid-cols-2 p-10 md:grid-cols-4 gap-2 sm:gap-2 md:gap-0  mt-5 md:mt-5 rounded overflow-hidden">
            <Totalcommit repo={repo} />
            <Weeklycommit repo={repo} />
            <Todaycommit repo={repo} />
            <Yesterdaycommit repo={repo} />
        </div>
    )
}
