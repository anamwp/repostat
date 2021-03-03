import React from 'react'
import { Octokit } from "@octokit/core";
import { useEffect, useState } from "react";
import Moment from 'react-moment'
import moment from 'moment';

export default function Repodata() {
    const [repo, setRepo] = useState();
    const octokit = new Octokit({ auth: process.env.gitauth });

    useEffect( async () => {

        const owner = 'gatsbyjs', 
            repo = 'gatsby',
            branch = 'master'
        
        const getRepos = await octokit.request(
            
            `GET /repos/${owner}/${repo}/commits?sha=${branch}`, {
                owner: owner,
                repo: repo,
            }
        );
        
        setRepo(getRepos);
    
    }, []);


    return (
        <div>
            <h3>
                Edumodo
            </h3>
            {
                repo 
                ? 
                repo.data.map( commit => <p key={commit.node_id}>{commit.commit.message} <Moment date={commit.commit.author.date} format='ll'/> </p>)
                : 
                'No commit'
            }
            
        </div>
    )
}
