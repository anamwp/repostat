import React, { useEffect, useState } from 'react'
import { Octokit } from "@octokit/core";
import moment from 'moment';

export default function Todaycommit(props) {
    const octokit = new Octokit({ auth: process.env.GITKEY });
    const [todaycommitobj, setTodaycommitobj] = useState();

    useEffect( async () => {

        const owner = props.repo.owner, 
        repo = props.repo.name,
        branch = props.repo.branch
        
        const getRepos = await octokit.request(
            `GET /repos/${owner}/${repo}/commits?sha=${branch}`, {
                owner: owner,
                repo: repo,
                per_page: 100
            }
        );
        
        const commits = getRepos.data
        .map(commit => {
            commit.date = moment(commit.commit.author.date).format('L');
            return commit;
        });
        const todayDate = moment().format('L');
        const todaycommiteddata = commits.filter(commit => commit.date === todayDate);
        setTodaycommitobj(todaycommiteddata);
    
    }, []);

    return (
        <div className="group border-r-0  p-2 py-3 text-green-500 max-w-full mx-auto w-full border  rounded-sm select-none overflow-hidden space-y-1 hover:bg-white">
            <p>
                <b>{todaycommitobj ? todaycommitobj.length : 'fetching data'}</b>
            </p>
            <h4>Today's Commit</h4>
        </div>
    )
}
