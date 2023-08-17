import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './app.css';
import SignIn from './component/login/signIn';
import SignUp from './component/login/Signup';
import axios from 'axios';
import ForgotPassword from './component/passwordReset/ForgotPassword';
import ResetPassword from './component/passwordReset/Reset';
import Sample from './component/income/sample';
import UserForm from './component/userDetails/userForm';
import Userlist from './component/userDetails/userlist';
import Graph from './component/graph/graph';
import About from './component/about';
import TableData from './component/graph/TableData';
import IncomeEdit from './component/income/incomeEdit';

function App() {
  const [user, setuser] = useState([]);
  const [chartData, setChartData] = useState([]);
  const BASE_URL = "https://pettycash-uvd8.onrender.com";
  // https://pettycash-uvd8.onrender.com
  // http://localhost:3001
  console.log("starting")
  useEffect(() => {
    axios
      .get(`${BASE_URL}/user/list`)
      .then(response => setuser(response.data))
    console.log(user);
  }, []);

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

  return (
    <Router>

      <Routes>
        <Route path='/' element={<SignIn BASE_URL={BASE_URL} />} />
        <Route path='/signup' element={<SignUp BASE_URL={BASE_URL} />} />
        <Route path='/forgotpassword' element={<ForgotPassword BASE_URL={BASE_URL} />} />
        <Route path='/resetpassword/:id' element={<ResetPassword user={user} BASE_URL={BASE_URL} />} />
      </Routes>

      <div id="page-top">
        <div id="wrapper">
          <Routes>
            <Route path='/sample' element={<Sample BASE_URL={BASE_URL} chartData={chartData} />} />
            <Route path='/incomeEdit' element={<IncomeEdit BASE_URL={BASE_URL} chartData={chartData} />} />
            <Route path='/user' element={<UserForm user={user} BASE_URL={BASE_URL} />} />
            <Route path='/userlist' element={<Userlist BASE_URL={BASE_URL} />} />
            <Route path='/graph' element={<Graph BASE_URL={BASE_URL} chartData={chartData} />} />
            <Route path='/about' element={<About BASE_URL={BASE_URL} />} />
            <Route path='/data' element={<TableData BASE_URL={BASE_URL} />} />

          </Routes>
        </div>
      </div>

    </Router>
  )
}

export default App