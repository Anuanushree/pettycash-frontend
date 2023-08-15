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
    const headers = {
        headers: { "authorization": `${token}` }
    }
    useEffect(() => {
        axios
            .get('http://localhost:3001/user/updateuser', headers)
            .then(response => setprofile(response.data))
        console.log(profile);
    }, []);
    const navigate = useNavigate();
    const hanldleLogout = (event) => {
        event.preventDefault();
        localStorage.removeItem(token);
        localStorage.removeItem(id);
        localStorage.removeItem(totalSaving);

        navigate('/')
    }
    return (
        <div>

            {/* <h2 className='text-right' id='headingStyle'>admin <span><a href='/userlist'>
                <i class="fa fa-user" aria-hidden="true"></i></a></span></h2> */}

            <div id='wrapper'>
                <ul className="navbar-nav bg-gradient bg sidebar sidebar-dark accordion" id="accordionSidebar">
                    <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                        <div className="sidebar-brand-icon rotate-n-15">
                            <br /><br />
                            <a href='/userlist'><i class="fa fa-user icon" aria-hidden="true"></i></a>
                            <p className="dashboard-user">{profile.username}</p>
                        </div>
                        <div className="sidebar-brand-text mx-3"></div>
                    </a>
                    <br /><br />
                    <li className="nav-item active">
                        <Link className="nav-link" to="/userlist">
                            <i className="far fa-id-badge" style={{ fontSize: "20px" }} ></i>
                            {/* <FontAwesomeIcon icon={faTachometerAlt} /> */}
                            <span>profile</span>
                        </Link>
                    </li>

                    <hr className="sidebar-divider"></hr>
                    <li className="nav-item ">
                        <Link className="nav-link" to="/graph">
                            <i class='fas fa-poll icon' style={{ fontSize: "20px" }}></i>
                            <span>graph</span>
                        </Link>
                    </li>


                    <hr className="sidebar-divider"></hr>
                    <li className="nav-item ">
                        <Link className="nav-link" to="/sample">
                            {/* <i class="fas fa-github"></i> */}
                            <i class="fas fa-money-check-alt icon" style={{ fontSize: "20px" }}></i>

                            <span>Income and Expenses</span>
                        </Link>
                    </li>
                    <hr className="sidebar-divider"></hr>
                    <li className="nav-item ">
                        <Link className="nav-link" to="/data">

                            <i class='fas fa-money-check icon' style={{ fontSize: "20px" }}></i>
                            {/* <FontAwesomeIcon icon={faTachometerAlt} /> */}
                            <span>Ledger</span>
                        </Link>
                    </li>
                    <hr className="sidebar-divider"></hr>
                    <li className="nav-item ">
                        <Link className="nav-link" to="/signin">
                            <i class='fas fa-power-off' style={{ fontSize: "20px" }}></i>
                            <span onClick={hanldleLogout}>log out </span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Dashboard;