// import React from 'react'
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import './dashboard.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from "axios";
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const [profile, setprofile] = useState([]);

    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');
    const totalSaving = localStorage.getItem('sumSave');

    const sumSave = localStorage.getItem('sumSave');
    const sumIncome = localStorage.getItem('sumIncome');
    const sumExpense = localStorage.getItem('sumExpense');
    const headers = {
        headers: { "authorization": `${token}` }
    }
    const BASE_URL = "https://pettycash-uvd8.onrender.com";

    useEffect(() => {
        axios
            .get(`${BASE_URL}/user/updateuser`, headers)
            .then(response => setprofile(response.data))
        console.log(profile);
    }, []);
    const navigate = useNavigate();
    const hanldleLogout = (event) => {
        event.preventDefault();
        localStorage.removeItem(token);
        localStorage.removeItem(id);
        localStorage.removeItem(totalSaving);

        localStorage.removeItem(sumSave);
        localStorage.removeItem(sumIncome);
        localStorage.removeItem(sumExpense);


        navigate('/')
    }
    const handlenav = (event) => {
        event.preventDefault();
        navigate('/profile')
    }
    return (
        <div>

            <div id='wrapper'>
                <ul className="navbar-nav bg-gradient bg sidebar sidebar-dark accordion" id="accordionSidebar">
                    <div className="sidebar-brand d-flex align-items-center justify-content-center" href="profile">
                        <div className="sidebar-brand-icon rotate-n-15">
                            <br /><br />
                            <a href="profile"><i className="fa fa-user icon" aria-hidden="true"></i></a>
                            <p onClick={handlenav} className="dashboard-user">{profile.username}</p>
                        </div>
                        <div className="sidebar-brand-text mx-3"></div>
                    </div>
                    <br /><br />
                    <li className="nav-item active">
                        <Link className="nav-link" to="/profile">
                            <i className="far fa-id-badge" style={{ fontSize: "20px" }} ></i>

                            <span>profile</span>
                        </Link>
                    </li>
                    <hr className="sidebar-divider"></hr>
                    <li className="nav-item ">
                        <Link className="nav-link" to="/sample">

                            <i className="fas fa-money-check-alt icon" style={{ fontSize: "20px" }}></i>

                            <span>Income and Expenses</span>
                        </Link>
                    </li>
                    <hr className="sidebar-divider"></hr>
                    <li className="nav-item ">
                        <Link className="nav-link" to="/graph">
                            <i className='fas fa-poll icon' style={{ fontSize: "20px" }}></i>
                            <span>graph</span>
                        </Link>
                    </li>
                    <hr className="sidebar-divider"></hr>
                    <li className="nav-item ">
                        <Link className="nav-link" to="/data">

                            <i className='fas fa-money-check icon' style={{ fontSize: "20px" }}></i>

                            <span>Ledger</span>
                        </Link>
                    </li>
                    <hr className="sidebar-divider"></hr>
                    <li className="nav-item ">
                        <Link className="nav-link" to="/">
                            <i className='fas fa-power-off' style={{ fontSize: "20px" }}></i>
                            <span onClick={hanldleLogout}>log out </span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Dashboard;