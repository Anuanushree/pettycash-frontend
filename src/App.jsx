import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './app.css';
import SignIn from './component/login/signIn';
import SignUp from './component/login/Signup';
import axios from 'axios';
import ForgotPassword from './component/passwordReset/ForgotPassword';
import ResetPassword from './component/passwordReset/Reset';
import Sample from './component/income/sample';
import UserForm from './component/userDetails/userForm';
import TableData from './component/graph/TableData';
import User from './component/userDetails/user';
import GraphData from './component/graph/graphData';
import EditIncome from './component/income/EditIncome';

function App() {
  const [user, setuser] = useState([]);
  const [chartData, setChartData] = useState([]);
  const BASE_URL = "https://pettycash-uvd8.onrender.com";
  // https://pettycash-uvd8.onrender.com
  // http://localhost:3001
  console.log("starting")
  useEffect(() => {
    const getuser = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/user/list`)
        setuser(response.data)
      } catch (error) {
        console.log("Error in getting user:", error)
      }
    };
    getuser()
  }, []);
  
  const token = localStorage.getItem('token');
  const headers = {
    headers: { "authorization": `${token}` }
  }
  useEffect(() => {
    axios
      .get(`${BASE_URL}/user/graph`, headers)
      .then(response => setChartData(response.data))
    console.log(chartData)
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
            <Route path='/sample' element={<Sample BASE_URL={BASE_URL} />} />
            <Route path='/edit' element={<EditIncome BASE_URL={BASE_URL} chartData={chartData} />} />
            <Route path='/user' element={<UserForm user={user} BASE_URL={BASE_URL} />} />
            <Route path='/profile' element={<User BASE_URL={BASE_URL} />} />
            <Route path='/graph' element={<GraphData BASE_URL={BASE_URL} />} />
            <Route path='/data' element={<TableData BASE_URL={BASE_URL} />} />

          </Routes>
        </div>
      </div>

    </Router>
  )
}

export default App