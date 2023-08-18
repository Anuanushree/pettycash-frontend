import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Dashboard from '../../dashboard/Dashboard';

function IncomeEdit({ chartData, BASE_URL }) {
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
    const _id = localStorage.getItem('selectedId');
    const monyr = localStorage.getItem('monyr')
    const navigate = useNavigate();


    const editData = async () => {
        const findIncomeData = chartData.find(data => data._id === _id);
        if (findIncomeData) {
            setdate(findIncomeData.date);
            setsalary(findIncomeData.salary);
            setincentive(findIncomeData.incentive);
            setrentIncome(findIncomeData.rentIncome);
            setothers(findIncomeData.others);
            setrent(findIncomeData.rent);
            setloan(findIncomeData.loan);
            setglossary(findIncomeData.glossary);
            settransport(findIncomeData.transport);
            setutilies(findIncomeData.utilies);

        }
    }
    useEffect(() => {
        editData();

    }, [])

    const handleupdate = async (event) => {
        event.preventDefault();

        const headers = {
            headers: { "authorization": `${token}` }
        }

        const getdate = new Date(date)
        const monthYear = (getdate.getMonth() + "/" + getdate.getFullYear())
        console.log(monthYear)
        // const findDate = monyr.find(data => data === monthYear)

            const savedata = {
                _id,
                salary,
                incentive,
                rentIncome,
                others,
                rent,
                date,
                glossary,
                loan, utilies,
                transport
            }
            try {
                const response = await axios.put(`${BASE_URL}/user/incomeEdit`, savedata, headers)
                console.log(response.data);
                navigate('/data');

            } catch (error) {
                console.log('Error in getting a data:', error);
                seterror(error.response.data.error);
            }
    }



    return (
        <>
            <Dashboard />
            <div className='background'>

                <div className='i-e-body '>
                    <h3 className='text-center'>Monthly Income and Expenses Form</h3>
                    <form onSubmit={handleupdate}>
                        <div className='row p-2'>

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
                                            value={rent} onChange={(e) => setrent(e.target.value)} />
                                        <label class="form-label" >Rent </label>
                                    </div>

                                    <div className="form-outline mb-4">
                                        <input type="number" className="form-control"
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

export default IncomeEdit