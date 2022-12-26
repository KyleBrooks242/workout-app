import React from 'react';
import {Card, CardContent, CardHeader} from "@mui/material";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface Props {
    categories: any
    categoryCount: any
    workouts: any
}

export const ProfileStatsComponent = (props: Props) => {
    const labels:Array<string> = props.categories

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
                display: false
            },
            title: {
                display: false,
                text: 'Workouts by Category',
            },
        },
        scales: {
            x: {
                grid: {
                    display: false
                }
            },
            y: {
                grid: {
                    display: true
                }
            }
        }
    };
    const data = {
        labels,
        datasets: [
            {
                label: 'Workouts by Category',
                data: labels.map((label) => props.categoryCount[label]),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    const listByCategory = () => {
        const result:Array<any> = [];
        Object.keys(props.categoryCount).forEach((key:any, index) => {
            result.push(<p key={index}><b>{key}: </b>{props.categoryCount[key]}</p>)
        });

        return result;
    }

    return (
        <Card>
            <CardHeader
                title={'Stats'}
            />
            <CardContent>
                {/*<p><b>Total Workouts: </b>{props.workouts.length}</p>*/}
                <Bar options={options} data={data} />
                {/*{ listByCategory() }*/}
            </CardContent>
        </Card>
    )
}