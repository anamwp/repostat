import React from 'react'
import { Octokit } from "@octokit/core";
import { useEffect, useState } from "react";

import { Line } from 'react-chartjs-2'
// console.log('GITKEY', process.env.GITKEY);
const weekCount = [];
for(let a=1; a<=52; a++){
    weekCount.push(a);
};
// console.log('weekCount', weekCount);


export default function Weeklycommitgraph() {
    const [commits, setCommits] = useState([]);
    const octokit = new Octokit({ auth: process.env.GITKEY });
    

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
        repo = 'elementor',
        branch = 'master'
        
        const weeklyCommit = await octokit.request(
            `GET /repos/${owner}/${repo}/stats/participation`, {
                owner: owner,
                repo: repo,
            }
        );
        // console.log('weeklyCommit', weeklyCommit.data.all);
        setCommits(weeklyCommit.data.all);
    
    }, []);
    // console.log('commit', commits);

    return (
        <div>
            <Line data={data} options={options} />
            {/* <h4> Weekly Commit </h4>
            <p>
                {
                    commits.data
                    ? 
                    commits.data.all[0]
                    : 
                    '0'
                }
            </p> */}
        </div>
    )
}
