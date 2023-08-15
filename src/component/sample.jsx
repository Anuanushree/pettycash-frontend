import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Dashboard from '../dashboard/Dashboard';

function Sample() {

    const [salary, setsalary] = useState("0");
    const [incentive, setincentive] = useState("0");
    const [rentIncome, setrentIncome] = useState("0");
    const [others, setothers] = useState(0);
    const [rent, setrent] = useState(0);
    const [glossary, setglossary] = useState(0);
    const [loan, setloan] = useState(0);
    const [utilies, setutilies] = useState(0);
    const [transport, settransport] = useState(0);
    const [date, setdate] = useState('');
    const [error, seterror] = useState('')

    const token = localStorage.getItem('token');

    const navigate = useNavigate();
    const headers = {
        headers: { "authorization": `${token}` }
    }
    const monyr = localStorage.getItem('monyr');
    const getdate = new Date(date)
    const handlesave = async (event) => {
        event.preventDefault();
        console.log(monyr)
        const monthYear = (getdate.getMonth() + "/" + getdate.getFullYear())
        console.log(monthYear)
        // const findDate = monyr.find(data => data === monthYear)

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
            try {
                const response = await axios.post('http://localhost:3001/user/incomedata', savedata, headers)
                console.log(response.data);
                navigate('/graph')
            } catch (error) {
                seterror('error in save ncome and expenses :', error)
            }

        } else {
            console.log("already exists")
            seterror('this moneth already exists')
        }
    }



    return (
        <>
            <Dashboard />
            <div className='i-e-body'>
                <form>
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


                                <div class="form-outline mb-4">
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
                                        value={rent} onChange={(e) => setrent(e.target.value)} />
                                    <label class="form-label" >Rent </label>
                                </div>

                                <div className="form-outline mb-4">
                                    <input type="number" class="form-control"
                                        value={glossary} onChange={(e) => setglossary(e.target.value)} />
                                    <label className="form-label" >Glossary</label>
                                </div>


                                <div className="form-outline mb-4">
                                    <input type="number" className="form-control"
                                        value={loan} onChange={(e) => setloan(e.target.value)} />
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
                        <button onClick={handlesave} class="btn btn-primary btn-block mb-4">Save</button>
                        <p>{error}</p>
                        {/* </div> */}
                    </div>
                </form>

            </div>
        </>
    )
}

export default Sample;