import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Dashboard from '../../dashboard/Dashboard';
import { useNavigate } from 'react-router-dom';
// require('../assets/react.svg')
function Userlist({ user, BASE_URL }) {
    const [profile, setprofile] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [image, setImage] = useState(null);

    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');
    const totalSaving = localStorage.getItem('sumSave');
    const year = localStorage.getItem('year');

   
    const headers = {
        headers: { "authorization": `${token}` }
    }
    useEffect(() => {
        axios
            .get(`${BASE_URL}/user/updateuser`, headers)
            .then(response => setprofile(response.data))
        console.log(profile);

    }, []);
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
    console.log(year);
    console.log(chartData)
    for (let yr of year) {
        const findyear = chartData.find(data => data.date.slice(0, 4) == yr)

        if (findyear) {
            console.log(findyear);
        }

    }
  
    return (
        <>
            <Dashboard />
            <div className='list-body background'>
                <h2 className='text-center' id='headingStyle'>Petty cashier<span><a href='/userlist'>
                    </a></span></h2>

                <div className="page-content page-container" id="page-content">
                    <div className="padding list-padding">
                        <div className="row container">
                            <div className="col-xl-10 col-md-12">
                                <div className="card user-card-full list-card">
                                    <div className="row m-l-0 m-r-0">
                                        <div className="col-sm-12 col-md-4 text-center bg-c-lite-green user-profile">
                                            <div className="card-block text-center text-white">
                                                <div className="m-b-25">
                                                    <img src={`/src/assets/${profile.profilename}`} class="img-radius img-fluid profile-img " alt="User-Profile-Image"
                                                    />
                                                </div>
                                                <h6 className="f-w-600">{profile.username}</h6>
                                                <p>{profile.profession}</p>
                                                <a href='/user'>Edit profile</a>
                                                <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                                            </div>
                                        </div>
                                        <div className="col-sm-8">
                                            <div className="card-block">
                                                <h6 className="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <p className="m-b-10 f-w-600">Email</p>
                                                        <h6 className="text-muted f-w-400">{profile.email}</h6>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <p className="m-b-10 f-w-600">Gender</p>
                                                        <h6 className="text-muted f-w-400">{profile.gender}</h6>
                                                    </div>
                                                </div>
                                                <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Addition information</h6>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <p className="m-b-10 f-w-600">Address</p>
                                                        <h6 className="text-muted f-w-400">{profile.address}</h6>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <p className="m-b-10 f-w-600">phone Number</p>
                                                        <h6 className="text-muted f-w-400">{profile.phone}</h6>
                                                    </div>
                                                </div>
                                                <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600"></h6>
                                                <div className="row">

                                                    <div className="col-sm-6">
                                                        <p className="m-b-10 f-w-600">Total saving :{totalSaving} </p>

                                                    </div>
                                                </div>
                                                <ul className="social-link list-unstyled m-t-40 m-b-10">
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