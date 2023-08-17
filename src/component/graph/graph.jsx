import React, { useEffect, useState } from 'react';
import { Bar } from "react-chartjs-2";
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from "chart.js";
import Dashboard from '../../dashboard/Dashboard';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
function Graph({ chartData }) {

    const [count, setcount] = useState(2023)

    const expenses = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const save = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const ExpenseTotal = [];
    const saveTotal = [];
    const income = [];
    const dates = [];
    const year = []
    localStorage.setItem('monyr', dates);

    if (chartData) {
        for (let dataobj of chartData) {

            const getmonth = new Date(dataobj.date);
            dates.push(getmonth.getMonth() + "/" + getmonth.getFullYear())

            const mon = (getmonth.getMonth());
            const yr = getmonth.getFullYear();
            year.push(getmonth.getFullYear());
            const totalIncome = parseInt(dataobj.salary + dataobj.others + parseInt(dataobj.incentive) + dataobj.rentIncome)
            const totalExpense = (dataobj.rent + dataobj.glossary + dataobj.utilies + dataobj.loan + dataobj.transport)
            ExpenseTotal.push(totalExpense);
            saveTotal.push(totalIncome - totalExpense)

            income.push(parseInt((totalIncome)));
            if (yr == count) {
                save.splice(parseInt(mon), 1, (((parseInt(totalIncome) - totalExpense) / totalIncome) * 100).toFixed(0))

                expenses.splice(parseInt(mon), 1, (((parseInt(totalExpense) / parseInt(totalIncome)) * 100).toFixed(0)))

            }

        }
    } else {
        console.log("chart not update")
    }
    let sumIncome = 0;
    for (let val in income) {
        sumIncome = sumIncome + income[val];
    }
    let sumExpense = 0;
    for (let val in ExpenseTotal) {
        sumExpense = sumExpense + parseInt(ExpenseTotal[val]);
    }
    console.log(sumExpense);
    let sumSave = 0;
    for (let val in saveTotal) {
        sumSave = sumSave + parseInt(saveTotal[val]);
    }
    console.log(sumSave);
    localStorage.setItem('sumSave', sumSave);
    localStorage.setItem("year", year)
    localStorage.setItem('sumIncome', sumIncome);
    localStorage.setItem('sumExpense', sumExpense);

    const data = ({
        labels: ["jan", "feb", "mar", "apr", "may", "jun", "july", "aug", "sep", "oct", "nov", "dec"], fontWeight: "normal",
        datasets: [
            {
                label: "Total Expense",
                data: expenses,
                backgroundColor: "blue",


            },
            {
                label: 'save amt',
                data: save,
                backgroundColor: 'green',

            },


        ],

    });
    const option = {
        responsive: true,
        plugins: {
            legend: { position: "top" },
            title: {
                display: true,
                text: `Income and Expenses in ${count} `,
                font: {
                    size: 25,
                },


            }

        },
    };
    const increament = () => {
        setcount(count + 1)
    }
    const decreament = () => {
        setcount(count - 1)
    }

    return (
        <>
            <Dashboard />
            <div className='background-graph'>
                <div className="App">
                    <p className='year'>  <i onClick={decreament} class="fa fa-arrow-left" aria-hidden="true"></i>
                        &nbsp;  {count}    &nbsp;<i onClick={increament} class="fa fa-arrow-right" aria-hidden="true"></i></p>

                    <Bar options={option} data={data} className='graph-bar fs-1' />

                </div>
            </div>
        </>
    )
}

export default Graph;