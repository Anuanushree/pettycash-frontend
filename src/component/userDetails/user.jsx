import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Dashboard from '../../dashboard/Dashboard';


function User({ BASE_URL }) {
    const [profile, setprofile] = useState([]);
    const [totalsaving, setTotalSaving] = useState("0");
    const token = localStorage.getItem('token');


    const headers = {
        headers: { "authorization": `${token}` }
    }
    const getUserProfile = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/user/updateuser`, headers)
            setprofile(response.data);
            console.log(profile);

        } catch (error) {
            console.log("error in profile :", error);

        }
    }
    useEffect(() => {
        getUserProfile();
    }, []);

    useEffect(() => {
        setTotalSaving(localStorage.getItem("sumSave"))
    })
    return (
        <>
            <Dashboard />

            <div className='list-body  background'>
                <h2 className='text-center' id='headingStyle'>Petty cashier</h2>

                <div className="page-content page-container d-flex justify-content-center" id="page-content">
                    <div className="padding list-padding">
                        <div className="row container">
                            <div className="col-xl-10 col-md-12">
                                <div className="card user-card-full list-card">
                                    <div className="row m-l-0 m-r-0">
                                        <div className="col-sm-12 col-md-4 text-center bg-c-lite-green user-profile">
                                            <div className="card-block text-center text-white">
                                                <div className="m-b-25">
                                                    <img src={`https://pettycash-uvd8.onrender.com/assets/${profile.profilename}`} className="img-radius img-fluid profile-img "
                                                        alt="Profile-Image-loading..."
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
                                                        <p className="m-b-10 f-w-600" onChange={totalsaving}>Total saving :{totalsaving} </p>

                                                    </div>
                                                </div>

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

export default User;