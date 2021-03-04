import React, { useEffect, useState } from 'react';
import { Octokit } from "@octokit/core";
import "tailwindcss/tailwind.css";
import ReactMarkdown from 'react-markdown'

export default function Latestrelase(props) {
    const octokit = new Octokit({ 
        auth: process.env.GITKEY 
    });
    // const octokit = new Octokit();
    const [pullhistory, setPullhistory] = useState();

    // console.log('env data', process.env.OWNER);

    useEffect( async () => {
        const owner = props.repo.owner, 
        repo = props.repo.name,
        branch = props.repo.branch;

        // console.log(owner, repo, branch);

        const checkpulls = await octokit.request(    
            `GET /repos/${owner}/${repo}/releases/latest`, {
                owner: owner,
                repo: repo,
            }
        );
        console.log('checkpulls', checkpulls.data.body);
        // console.log('checkRepPermission', checkRepPermission.data.private);

        // if(checkRepPermission.data.private == false){
        //     const repofirstcommit = await fetchFirstCommit({ owner, repo, sha:null })
        //     .then(commit => {
        //         return commit;
        //     })
        //     .catch(err => {
        //         console.log(err.message);
        //     });
        //     var firstcommitsha = repofirstcommit ? repofirstcommit.sha : '0af88efa4b6a26144c11f77bdc23d4ad26c624f5';
            
        // }else{
        //     firstcommitsha = 'needshaforprivaterepo';
        // }
        // const latestCommits = await octokit.request(    
        //     `GET /repos/${owner}/${repo}/commits?sha=${branch}`, {
        //         owner: owner,
        //         repo: repo,
        //         per_page: 5
        //     }
        // );
        // const lastcommitsha = latestCommits.data[0].sha;
        
        // // console.log('firstcommitsha', firstcommitsha , 'lastcommitsha', lastcommitsha);

        // const getTotalCommits = await octokit.request(
        //     `GET /repos/${owner}/${repo}/compare/${lastcommitsha}...${firstcommitsha}`, {
        //         owner: owner,
        //         repo: repo,
        //     }
        // ).catch(e => false);
        setPullhistory(checkpulls);
    
    }, []);

    // console.log('pullhistory --', pullhistory.data.body);

    return (
        <div className="group p-2 max-w-full mx-auto w-100 text-left  rounded-lg select-none overflow-hidden space-y-1">
            {pullhistory ? <ReactMarkdown>{pullhistory.data.body}</ReactMarkdown> : 'nothing'}
        </div>
    )
}
