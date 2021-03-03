import React from 'react'
import { Octokit } from "@octokit/core";
import { useEffect, useState } from "react";

export default function Weeklycommit(props) {
    const [commits, setCommits] = useState([]);
    const octokit = new Octokit({ auth: process.env.gitauth });

    useEffect( async () => {

        const owner = props.repo.owner, 
        repo = props.repo.name,
        branch = props.repo.branch
        
        const weeklyCommit = await octokit.request(
            `GET /repos/${owner}/${repo}/stats/participation`, {
                owner: owner,
                repo: repo,
            }
        );
        setCommits(weeklyCommit);
    
    }, []);

    return (
        <div>
            <h4> Weekly Commit </h4>
            <p>
                {
                    commits.data
                    ? 
                    commits.data.all[commits.data.all.length - 1]
                    : 
                    '0'
                }
            </p>
        </div>
    )
}
