import React, { useEffect, useState } from 'react'
import { Octokit } from "@octokit/core";

export default function Repoinfo(props) {
    const octokit = new Octokit({ auth: process.env.GITKEY });
    const [repoinfo, setRepoinfo] = useState();

    useEffect( async () => {

        const owner = props.repo.owner, 
        repo = props.repo.name,
        branch = props.repo.branch
        
        const getRepos = await octokit.request(
            `GET /repos/${owner}/${repo}?sha=${branch}`, {
                owner: owner,
                repo: repo,
            }
        ).catch(e => false);
        console.log('getRepos', getRepos)
        setRepoinfo(getRepos);
    
    }, []);
    console.warn('repoinfo', repoinfo);
    return (
        <div>
            <h4>Check console for repo info</h4>
        </div>
    )
}
