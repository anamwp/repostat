import React from 'react'
import { Octokit } from "@octokit/core";
import { useEffect, useState } from "react";
import Chart from "chart.js";

const weekCount = [];
for(let a=1; a<=8; a++){
    weekCount.push(a);
};

export default function Weeklycommitgraph(props) {
    const octokit = new Octokit({ auth: process.env.GITKEY });    
    const [commits, setCommits] = useState([]);

    const buildChart = (commits) => {
        const ctx = document.getElementById("weeklygraph");
        new Chart(ctx, {
            type: "line",
            data: {
                labels: weekCount,
                datasets: [
                    {
                        label: 'Commit',
                        data: commits.slice(0, 8),
                        fill: false,
                        backgroundColor: 'rgb(64, 196, 99)',
                        borderColor: 'rgba(64, 196, 99, 0.2)',
                    }
                ],
            },
            
        });
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
        buildChart(weeklyCommit.data.all);
        
    
    }, []);

    return (
        <div className="container max-w-screen-md mx-auto px-2 md:px-10">
            <canvas id="weeklygraph"/>
        </div>
    )
}
