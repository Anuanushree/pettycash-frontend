import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Dashboard from '../../dashboard/Dashboard';
import { useNavigate } from 'react-router-dom';
// require('../assets/react.svg')
function Userlist({ user }) {
    const [profile, setprofile] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [image, setImage] = useState(null);

    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');
    const totalSaving = localStorage.getItem('sumSave');
    const year = localStorage.getItem('year');
    console.log(totalSaving)

    const frequency = {};
    const headers = {
        headers: { "authorization": `${token}` }
    }
    useEffect(() => {
        axios
            .get('http://localhost:3001/user/updateuser', headers)
            .then(response => setprofile(response.data))
        console.log(profile);

    }, []);
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
    console.log(year);
    console.log(chartData)
    for (let yr of year) {
        const findyear = chartData.find(data => data.date.slice(0, 4) == yr)

        if (findyear) {
            console.log(findyear);
        }

    }
    // for (let dataobj of chartData) {
    //     const getmonth = new Date(dataobj.date);
    //     const yr = getmonth.getFullYear();

    //     frequency[yr] = 0;

    //     const totalIncome = parseInt(dataobj.salary + dataobj.others + parseInt(dataobj.incentive) + dataobj.rentIncome)
    //     const totalExpense = (dataobj.rent + dataobj.glossary + dataobj.utilies + dataobj.loan + dataobj.transport)

    //     saveTotal.push(totalIncome - totalExpense);
    //     // sum = sum + parseInt(saveTotal);

    // }
    // for (let dataobj of chartData) {
    //     const getmonth = new Date(dataobj.date);
    //     const yr = getmonth.getFullYear();
    //     const totalIncome = parseInt(dataobj.salary + dataobj.others + parseInt(dataobj.incentive) + dataobj.rentIncome)
    //     const totalExpense = (dataobj.rent + dataobj.glossary + dataobj.utilies + dataobj.loan + dataobj.transport)
    //     saveTotal = totalIncome - totalExpense;
    //     frequency[yr]++;
    //     frequency[]
    // }

    // console.log(chartData)
    // const organizedTransactions = Object.fromEntries([...new Set(chartData.map(t => parseInt(t.date.split('-')[0])))].map(yr => [yr, Object.fromEntries([...new Set(chartData.filter(t => parseInt(t.date.split('-')[0]) === yr).map(t => parseInt(t.date.split('-')[1])))].map(mo => [mo, chartData.filter(t => parseInt(t.date.split('-')[0]) === yr && parseInt(t.date.split('-')[1]) === mo)]))]));
    // console.log(organizedTransactions);
    return (
        <>
            <Dashboard />
            <div className='list-body'>
                <h2 className='text-center' id='headingStyle'>Petty cashier<span><a href='/userlist'>
                    <i class="fa fa-user" aria-hidden="true"></i></a></span></h2>

                <div class="page-content page-container" id="page-content">
                    <div class="padding list-padding">
                        <div class="row container">
                            <div class="col-xl-10 col-md-12">
                                <div class="card user-card-full list-card">
                                    <div class="row m-l-0 m-r-0">
                                        <div class="col-sm-12 col-md-4 text-center bg-c-lite-green user-profile">
                                            <div class="card-block text-center text-white">
                                                <div class="m-b-25">
                                                    <img src={`/src/assets/${profile.profilename}`} class="img-radius img-fluid profile-img " alt="User-Profile-Image"
                                                    />
                                                </div>
                                                <h6 class="f-w-600">{profile.username}</h6>
                                                <p>{profile.profession}</p>
                                                <a href='/user'>Edit profile</a>
                                                <i class=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                                            </div>
                                        </div>
                                        <div class="col-sm-8">
                                            <div class="card-block">
                                                <h6 class="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
                                                <div class="row">
                                                    <div class="col-sm-6">
                                                        <p class="m-b-10 f-w-600">Email</p>
                                                        <h6 class="text-muted f-w-400">{profile.email}</h6>
                                                    </div>
                                                    <div class="col-sm-6">
                                                        <p class="m-b-10 f-w-600">Gender</p>
                                                        <h6 class="text-muted f-w-400">{profile.gender}</h6>
                                                    </div>
                                                </div>
                                                <h6 class="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Addition information</h6>
                                                <div class="row">
                                                    <div class="col-sm-6">
                                                        <p class="m-b-10 f-w-600">Address</p>
                                                        <h6 class="text-muted f-w-400">{profile.address}</h6>
                                                    </div>
                                                    <div class="col-sm-6">
                                                        <p class="m-b-10 f-w-600">phone Number</p>
                                                        <h6 class="text-muted f-w-400">{profile.phone}</h6>
                                                    </div>
                                                </div>
                                                <h6 class="m-b-20 m-t-40 p-b-5 b-b-default f-w-600"></h6>
                                                <div class="row">

                                                    <div class="col-sm-6">
                                                        <p class="m-b-10 f-w-600">Total saving :{totalSaving} </p>

                                                    </div>
                                                </div>
                                                <ul class="social-link list-unstyled m-t-40 m-b-10">
                                                    <li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="facebook" data-abc="true"><i class="mdi mdi-facebook feather icon-facebook facebook" aria-hidden="true"></i></a></li>
                                                    <li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="twitter" data-abc="true"><i class="mdi mdi-twitter feather icon-twitter twitter" aria-hidden="true"></i></a></li>
                                                    <li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="instagram" data-abc="true"><i class="mdi mdi-instagram feather icon-instagram instagram" aria-hidden="true"></i></a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Userlist;