import React from 'react'
import { Octokit } from "@octokit/core";
import { useEffect, useState } from "react";
import { Line } from 'react-chartjs-2';

const weekCount = [];
for(let a=1; a<=52; a++){
    weekCount.push(a);
};

export default function Weeklycommitgraph() {
    // const octokit = new Octokit({ auth: process.env.GITKEY });    
    const octokit = new Octokit();    
    const [commits, setCommits] = useState([]);

    const data = {
        labels: weekCount,
        datasets: [
            {
            label: '# of Commit',
            data: commits,
            fill: false,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 0.2)',
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

        const owner = 'elementor', 
        repo = 'elementor';
        
        const weeklyCommit = await octokit.request(
            `GET /repos/${owner}/${repo}/stats/participation`, {
                owner: owner,
                repo: repo,
            }
        );
        console.log('weeklyCommit', weeklyCommit);
        setCommits(weeklyCommit.data.all);
    
    }, []);

    return (
        <div>
            <Line data={data} options={options} />
        </div>
    )
}
