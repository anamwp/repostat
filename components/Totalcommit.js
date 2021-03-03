import React, { useEffect, useState } from 'react';
import { Octokit } from "@octokit/core";
import fetchFirstCommit from 'repo-first-commit';

export default function Totalcommit(props) {
    const octokit = new Octokit({ auth: process.env.gitauth });
    const [commithistory, setCommithistory] = useState();

    // console.log('env data', process.env.OWNER);

    useEffect( async () => {
        const owner = props.repo.owner, 
        repo = props.repo.name,
        branch = props.repo.branch;

        console.log(owner, repo, branch);

        const repofirstcommit = await fetchFirstCommit({ owner, repo, sha:null })
        .then(commit => {
            return commit;
        })
        .catch(err => {
            console.log(err.message);
        });
        const firstcommitsha = repofirstcommit.sha;
        
        const latestCommits = await octokit.request(    
            `GET /repos/${owner}/${repo}/commits?sha=${branch}`, {
                owner: owner,
                repo: repo,
                per_page: 5
            }
        );
        const lastcommitsha = latestCommits.data[0].sha;


        const getTotalCommits = await octokit.request(
            `GET /repos/${owner}/${repo}/compare/${lastcommitsha}...${firstcommitsha}`, {
                owner: owner,
                repo: repo,
            }
        );
        setCommithistory(getTotalCommits);
    
    }, []);
    // console.log('commithistory --', commithistory.data);
    return (
        <div>
            <h4>Total Commit</h4>
            <p>
                {commithistory ? +commithistory.data.behind_by + 1 : '0'}
            </p>
        </div>
    )
}
