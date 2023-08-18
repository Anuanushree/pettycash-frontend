import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link, redirect } from 'react-router-dom';
import Dashboard from '../../dashboard/Dashboard';
import { useNavigate } from 'react-router-dom';

function TableData({ BASE_URL }) {
    const [chartData, setChartData] = useState([]);
    const ExpenseTotal = [];
    const saveTotal = [];
    const income = [];
    const dates = [];
    const token = localStorage.getItem('token');
    const headers = {
        headers: { "authorization": `${token}` }
    }
    useEffect(() => {
        axios
            .get(`${BASE_URL}/user/graph`, headers)
            .then(response => setChartData(response.data))
            .catch(err => {
                console.log('error in graph:', err)
            })
    }, []);
    const navigate = useNavigate();
    if (chartData) {
        for (let dataobj of chartData) {
            const totalIncome = parseInt(dataobj.salary + dataobj.others + parseInt(dataobj.incentive) + dataobj.rentIncome)
            const totalExpense = (dataobj.rent + dataobj.glossary + dataobj.utilies + dataobj.loan + dataobj.transport)
            ExpenseTotal.push(totalExpense);
            saveTotal.push(totalIncome - totalExpense)
            income.push(parseInt((totalIncome)));
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
    localStorage.setItem('sumSave', sumSave)

    function setId(selectedId) {
        localStorage.setItem('selectedId', selectedId);
        console.log('button clicked', selectedId)
    }
    const deleteditems = async (_id) => {
        try {
            const response = await axios.delete(`${BASE_URL}/user/incomedelete/${_id}`, headers)
            console.log(response.data);

        } catch (error) {
            console.log("Error in delete income data:", error)
        }
        navigate(0);
    }

    return (
        <>
            <Dashboard />
            {/* <Table striped bordered hover responsive> */}
            <div className='table-responsive background'>
                <h3 className='text-center'>LEDGER</h3>
                <table className="table table-dark table-bordered border border-primary p-2 m-4">
                    <thead>
                        <tr><th colSpan="6"> Income</th>
                            <th colSpan={8}>Expenses And Total</th>
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
                            <th rowSpan="2">Total Income</th>
                            <th rowSpan="2">Total Expenses</th>
                            <th rowSpan="2" colSpan={2}>Total save</th>

                        </tr>
                    </tbody>
                    {
                        chartData.map((datas) => (
                            <tbody key={datas._id}>
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
                                    <td>{parseInt(datas.salary + datas.others + parseInt(datas.incentive)) - (datas.rent + datas.glossary
                                        + datas.utilies + datas.loan + datas.transport)}</td>
                                    <td><Link to='/incomeEdit'>
                                        <button className="btn btn-info"
                                            onClick={(e) =>
                                                setId(datas._id)}
                                            variant="info">
                                            Update</button></Link>
                                        <Link >
                                            <button className='btn btn-danger'
                                                onClick={(e) =>
                                                    deleteditems(datas._id)}>delete</button>
                                        </Link>
                                    </td>

                                </tr>
                            </tbody>

                        ))
                    }

                    <tfoot>
                        <tr>
                            <td colSpan={10}>Total</td>
                            <td>{sumIncome}</td>
                            <td>{sumExpense}</td>
                            <td colSpan={2}>{sumSave}</td>
                        </tr>
                    </tfoot>


                </table>
            </div>
            {/* </Table> */}
        </>
    )
}

export default TableData;