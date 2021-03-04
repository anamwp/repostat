import React, { useEffect, useState } from 'react';
import { Octokit } from "@octokit/core";
import "tailwindcss/tailwind.css";
import ReactMarkdown from 'react-markdown'

export default function Latestrelase(props) {
    const octokit = new Octokit({ 
        auth: process.env.GITKEY 
    });
    const [pullhistory, setPullhistory] = useState();


    useEffect( async () => {
        const owner = props.repo.owner, 
        repo = props.repo.name,
        branch = props.repo.branch;

        const checkpulls = await octokit.request(    
            `GET /repos/${owner}/${repo}/releases/latest`, {
                owner: owner,
                repo: repo,
            }
        );
        
        setPullhistory(checkpulls);
    
    }, []);

    return (
        <div className="group p-2 max-w-full mx-auto w-100 text-left  rounded-lg select-none overflow-hidden space-y-1">
            {pullhistory ? <ReactMarkdown>{pullhistory.data.body}</ReactMarkdown> : 'nothing'}
        </div>
    )
}
