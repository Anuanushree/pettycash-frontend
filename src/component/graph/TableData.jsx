import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Dashboard from '../../dashboard/Dashboard';
import { useNavigate } from 'react-router-dom';

function TableData({ BASE_URL }) {

    const sumSave = localStorage.getItem('sumSave');
    const sumIncome = localStorage.getItem('sumIncome');
    const sumExpense = localStorage.getItem('sumExpense');
    const [chartData, setChartData] = useState([]);
    console.log(sumExpense);

    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const headers = {
        headers: { "authorization": `${token}` }
    }
    const chart = () => {

        axios
            .get(`${BASE_URL}/user/graph`, headers)
            .then(response => setChartData(response.data))


            .catch(err => {
                console.log('error in graph:', err)
            })
    }

    useEffect(() => {
        chart();
    }, []);

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
        navigate("/data");
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