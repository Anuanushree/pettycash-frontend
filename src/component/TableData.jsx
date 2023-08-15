import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Dashboard from '../dashboard/Dashboard';

function TableData() {

    const sumSave = localStorage.getItem('sumSave');
    const sumIncome = localStorage.getItem('sumIncome');
    const sumExpense = localStorage.getItem('sumExpense');
    const [chartData, setChartData] = useState([]);
    console.log(sumExpense);
    const token = localStorage.getItem('token');
    const chart = () => {
        const headers = {
            headers: { "authorization": `${token}` }
        }
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
   
    return (
        <>
            <Dashboard />
            <table className="table table-dark table-bordered border border-primary p-2 m-4">
                <thead>
                    <tr><th colSpan="6"> Income</th>
                        <th colSpan={7}>Expenses And Total</th>
                    </tr>
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
                        <tbody key={datas.id}>
                            <tr>
                                {/* {date.map(date => <td >{date}</td>)} */}
                                <td>{datas.date}</td>
                                <td>{datas.salary}</td>
                                <td>{datas.rentIncome}</td>
                                <td>{datas.incentive}</td>
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
                }

                <tfoot>
                    <tr>
                        <td colSpan={10}>Total</td>
                        <td>{sumIncome}</td>
                        <td>{sumExpense}</td>
                        <td>{sumSave}</td>
                    </tr>
                </tfoot>


            </table>
        </>
    )
}

export default TableData;