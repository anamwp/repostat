import React, { useEffect, useState } from 'react'
import { Octokit } from "@octokit/core";
import moment from 'moment';

export default function Todaycommit(props) {
    const octokit = new Octokit({ auth: process.env.gitauth });
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
        // console.log('todayDate', todayDate);
        // console.log('commits', commits);
        // console.log('todaycommiteddata', todaycommiteddata);
        setTodaycommitobj(todaycommiteddata);
    
    }, []);

    return (
        <div>
            <h4>Today's Commit</h4>
            <p>
                {todaycommitobj ? todaycommitobj.length : 'fetching data'}
            </p>
        </div>
    )
}
