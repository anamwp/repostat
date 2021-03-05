import React from 'react'
import { Octokit } from "@octokit/core";
import { useEffect, useState } from "react";
import { Line } from 'react-chartjs-2';

const weekCount = [];
for(let a=1; a<=8; a++){
    weekCount.push(a);
};

export default function Weeklycommitgraph(props) {
    const octokit = new Octokit({ auth: process.env.GITKEY });    
    const [commits, setCommits] = useState([]);

    const data = {
        labels: weekCount,
        datasets: [
            {
            label: 'Weekly Commit',
            data: commits.slice(0, 8),
            fill: false,
            backgroundColor: 'rgb(64, 196, 99)',
            borderColor: 'rgba(64, 196, 99, 0.2)',
            },
        ],
    };
    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                    beginAtZero: true,
                    },
                },
            ],
        },
    }

    useEffect( async () => {

        const owner = props.repo.owner, 
        repo = props.repo.name;
        
        const weeklyCommit = await octokit.request(
            `GET /repos/${owner}/${repo}/stats/participation`, {
                owner: owner,
                repo: repo,
            }
        );
        setCommits(weeklyCommit.data.all);
    
    }, []);

    return (
        <div className="container max-w-screen-md mx-auto">
            <Line data={data} options={options} />
        </div>
    )
}
