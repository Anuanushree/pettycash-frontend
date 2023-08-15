import React, { useEffect, useState } from 'react';
import { Bar } from "react-chartjs-2";
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from "chart.js";
import axios from 'axios';
import Dashboard from './dashboard/Dashboard';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
function Graph() {
    const [chartData, setChartData] = useState([]);
    const [count, setcount] = useState(2023)
    const token = localStorage.getItem('token');
    const headers = {
        headers: { "authorization": `${token}` }
    }
    const expenses = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const save = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const ExpenseTotal = [];
    const saveTotal = [];
    const income = [];
    const dates = [];
    const year = []
    localStorage.setItem('monyr', dates);
    const chart = () => {
        axios
            .get('http://localhost:3001/user/graph', headers)
            .then(response => setChartData(response.data))


            .catch(err => {
                console.log('error in graph:', err)
            })
    }

    useEffect(() => {
        chart();
    }, []);

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
        labels: ["jan", "feb", "mar", "apr", "may", "jun", "july", "aug", "sep", "oct", "nov", "dec"],
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

            }

        ],

    });
    const option = {
        responsive: true,
        plugins: {
            legend: { position: "top" },
            title: {
                display: true,
                text: `Income and Expenses in ${count} `,
            },
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
            <div className="App">
                <p className='year'>     <i onClick={decreament} class="fa fa-arrow-left" aria-hidden="true"></i>
                    &nbsp;  {count}    &nbsp;<i onClick={increament} class="fa fa-arrow-right" aria-hidden="true"></i></p>

                <Bar options={option} data={data} className='graph-bar' />
                {/* <table className="table table-dark table-bordered border border-primary p-2">
                    <thead>
                        <tr><th colSpan="6"> Income</th>
                            <th colSpan={7}>Expenses And Total</th>
                        </tr> */}

                {/* <tr>
                            <td rowspan="1">Date</td>
                            <th colspan="4">income</th>

                            <th colspan="5">expenses</th>
                            <th rowspan="2">Total Income</th>
                            <th rowspan="2">Total Expenses</th>
                            <th rowspan="2">Total save</th>
                        </tr>
                        */}
                {/* 
                    </thead>
                    <tbody>

                        <tr>
                            <th>Date</th>
                            <th >salary</th>
                            <th>RentIncome</th>
                            <th>Incentive</th>
                            <th>Others</th>
                            <th>Rent</th>
                            <th>Glossary</th>
                            <th>loan</th>
                            <th>Transport</th>
                            <th>Utilies</th>
                            <th rowspan="2">Total Income</th>
                            <th rowspan="2">Total Expenses</th>
                            <th rowspan="2">Total save</th>
                        </tr>
                    </tbody>
                    {
                        chartData.map((datas) => (
                            <tbody key={dates.id}>
                                <tr> */}
                {/* {date.map(date => <td >{date}</td>)} */}
                {/* <td>{datas.date}</td>
                                    <td>{datas.salary}</td>
                                    <td>{datas.rentIncome}</td> */}
                {/* <td>{datas.incentive}</td>
                                    <td>{datas.others}</td>
                                    <td>{datas.rent}</td>
                                    <td>{datas.glossary}</td>
                                    <td>{datas.loan}</td>
                                    <td>{datas.transport}</td>
                                    <td>{datas.utilies}</td>
                                    <td>{parseInt(datas.salary + datas.others + parseInt(datas.incentive) + parseInt(datas.rentIncome))}</td>
                                    <td>{datas.rent + datas.glossary + datas.utilies + datas.loan + datas.transport}</td>
                                    <td>{parseInt(datas.salary + datas.others + parseInt(datas.incentive)) - (datas.rent + datas.glossary + datas.utilies + datas.loan + datas.transport)}</td>
                                </tr>
                            </tbody>

                        ))
                    } */}
                {/* 
                    <tfoot>
                        <tr>
                            <td colSpan={10}>Total</td>
                            <td>{sumIncome}</td>
                            <td>{sumExpense}</td>
                            <td>{sumSave}</td>
                        </tr>
                    </tfoot>


                </table> */}


            </div>
        </>
    )
}

export default Graph;