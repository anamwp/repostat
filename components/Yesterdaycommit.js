import React, { useEffect, useState } from 'react'
import { Octokit } from "@octokit/core";
import moment from 'moment';

export default function Yesterdaycommit(props) {
    const octokit = new Octokit({ auth: process.env.GITKEY });
    const [yesterdaycommitobj, setYesterdaycommitobj] = useState()

    useEffect( async () => {

        const owner = props.repo.owner, 
        repo = props.repo.name,
        branch = props.repo.branch
        
        const getRepos = await octokit.request(
            `GET /repos/${owner}/${repo}/commits?sha=${branch}`, {
                owner: owner,
                repo: repo,
                per_page:100,
            }
        );
        
        const commits = getRepos.data
        .map(commit => {
            commit.date = moment(commit.commit.author.date).format('L');
            return commit;
        });
        const yesterdaydate = moment().subtract(1, 'days').format('L');
        const yesterdaycommitedObj = commits.filter(commit => commit.date === yesterdaydate);
        setYesterdaycommitobj(yesterdaycommitedObj);
    
    }, []);

    return (
        <div className="group p-2 py-3 text-blue-500 max-w-full mx-auto w-full border  rounded-sm select-none overflow-hidden space-y-1 hover:bg-white">
            <p>
                <b>{yesterdaycommitobj ? yesterdaycommitobj.length : 'fetching data'}</b>
            </p>
            <h4>Yesterday Commit</h4>
        </div>
    )
}
