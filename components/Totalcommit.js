import React, { useEffect, useState } from 'react';
import { Octokit } from "@octokit/core";
import fetchFirstCommit from 'repo-first-commit';
import "tailwindcss/tailwind.css";

export default function Totalcommit(props) {
    const octokit = new Octokit({ 
        auth: process.env.GITKEY 
    });
    const [commithistory, setCommithistory] = useState();

    useEffect( async () => {
        const owner = props.repo.owner, 
        repo = props.repo.name,
        branch = props.repo.branch;

        const checkRepPermission = await octokit.request(    
            `GET /repos/${owner}/${repo}`, {
                owner: owner,
                repo: repo,
            }
        );

        if(checkRepPermission.data.private == false){
            const repofirstcommit = await fetchFirstCommit({ owner, repo, sha:null })
            .then(commit => {
                return commit;
            })
            .catch(err => {
                console.log(err.message);
            });
            var firstcommitsha = repofirstcommit ? repofirstcommit.sha : '0af88efa4b6a26144c11f77bdc23d4ad26c624f5';
            
        }else{
            firstcommitsha = 'needshaforprivaterepo';
        }
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
        ).catch(e => false);
        setCommithistory(getTotalCommits);
    
    }, []);

    return (
        <div className="group p-2 py-3 text-purple-500 border-r-0 max-w-full mx-auto w-full border  rounded-sm select-none overflow-hidden space-y-1 hover:bg-white">
            <p>
                <b>
                { 
                commithistory
                ? +commithistory.data.behind_by + 1 
                : '0'
            }
                </b>
            </p>
            <h4>Total Commit</h4>
        </div>
    )
}
