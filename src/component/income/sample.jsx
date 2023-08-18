import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Dashboard from '../../dashboard/Dashboard';

function Sample({ BASE_URL }) {

    const [salary, setsalary] = useState(0);
    const [incentive, setincentive] = useState(0);
    const [rentIncome, setrentIncome] = useState(0);
    const [others, setothers] = useState(0);
    const [rent, setrent] = useState(0);
    const [glossary, setglossary] = useState(0);
    const [loan, setloan] = useState(0);
    const [utilies, setutilies] = useState(0);
    const [transport, settransport] = useState(0);
    const [date, setdate] = useState('');
    const [error, seterror] = useState('')

    const token = localStorage.getItem('token');
    const monyr = localStorage.getItem('monyr');


    const navigate = useNavigate();
    const headers = {
        headers: { "authorization": `${token}` }
    }
    console.log(monyr)
    const handlesave = async (event) => {
        event.preventDefault();
        console.log(monyr)
        const getdate = new Date(date)
        const monthYear = (getdate.getMonth() + "/" + getdate.getFullYear())
        console.log(monthYear);

        if (!monyr.includes(monthYear)) {

            const savedata = {
                date,
                salary,
                incentive,
                rentIncome,
                others,
                rent,
                glossary,
                loan, utilies,
                transport
            }
            if (date != '') {
                try {
                    const response = await axios.post(`${BASE_URL}/user/incomedata`, savedata, headers)
                    console.log(response.data);
                    if (response.data) {
                        navigate('/graph')
                    }

                } catch (error) {
                    console.log('error in save income and expenses :', error);
                    seterror(error.response.data.error)
                }
            } else {
                seterror('fill the form');
            }
        } else {
            console.log("already exists")
            seterror('This month already exists');
        }

    }



    return (
        <>
            <Dashboard />
            <div className='background'>
                <div className='i-e-body '>
                    <h3 className='text-center'>Monthly Income and Expenses Form</h3>
                    <form onSubmit={handlesave}>
                        <div className='row p-2'>

                            <input type='date' className='m-2 p-2'
                                value={date} onChange={(e) => setdate(e.target.value)} required />
                            <div className='col-md-6 '>
                                <div className='income-body p-4'>

                                    <div className="form-outline mb-4">
                                        <input type="number" className="form-control"
                                            value={salary} onChange={(e) => setsalary(e.target.value)} required />
                                        <label className="form-label" >Monthly Salary</label>
                                    </div>


                                    <div className="form-outline mb-4">
                                        <input type="number" className="form-control"
                                            value={incentive} onChange={(e) => setincentive(e.target.value)} required />
                                        <label className="form-label" >Incentive</label>
                                    </div>

                                    <div className="form-outline mb-4">
                                        <input type="number" className="form-control"
                                            value={rentIncome} onChange={(e) => setrentIncome(e.target.value)} required />
                                        <label className="form-label">Renting Income</label>
                                    </div>


                                    <div className="form-outline mb-4">
                                        <input type="number" className="form-control"
                                            value={others} onChange={(e) => setothers(e.target.value)} required />
                                        <label className="form-label" >others</label>
                                    </div>


                                </div>
                            </div>
                            <div className='col-md-6 mb-4'>
                                <div className='income-body p-4'>

                                    <div className="form-outline mb-4">
                                        <input type="number" className="form-control"
                                            value={rent} onChange={(e) => setrent(e.target.value)} required />
                                        <label class="form-label" >Rent </label>
                                    </div>

                                    <div className="form-outline mb-4">
                                        <input type="number" className="form-control"
                                            value={glossary} onChange={(e) => setglossary(e.target.value)} required />
                                        <label className="form-label" >Glossary</label>
                                    </div>


                                    <div className="form-outline mb-4">
                                        <input type="number" className="form-control"
                                            value={loan} onChange={(e) => setloan(e.target.value)} required />
                                        <label className="form-label">Loan payment</label>
                                    </div>


                                    <div className="form-outline mb-4">
                                        <input type="number" className="form-control"
                                            value={transport} onChange={(e) => settransport(e.target.value)} />
                                        <label className="form-label" >Transport</label>
                                    </div>
                                    <div className="form-outline mb-4">
                                        <input type="number" className="form-control"
                                            value={utilies} onChange={(e) => setutilies(e.target.value)} />
                                        <label className="form-label" >Utilies</label>
                                    </div>
                                </div>
                            </div>
                            {/* <div className='col-md-6 text center'> */}
                            <button type='submit' className="btn btn-primary btn-block mb-4">Save</button>
                            <p className='text-center error'>{error}</p>
                            {/* </div> */}
                        </div>
                    </form>

                </div>
            </div>
        </>
    )
}

export default Sample;