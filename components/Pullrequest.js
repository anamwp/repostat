import React, { useEffect, useState } from 'react';
import { Octokit } from "@octokit/core";
import "tailwindcss/tailwind.css";

export default function Pullrequest(props) {
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

    console.log('pullhistory --', pullhistory);

    return (
        <div className="group px-6 py-5 max-w-full mx-auto w-72 border border-indigo-500 border-opacity-25 cursor-pointer rounded-lg select-none overflow-hidden space-y-1 hover:bg-white hover:shadow-lg hover:border-transparent">
            
            <h4>pull</h4>
        </div>
    )
}
