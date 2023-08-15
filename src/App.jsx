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
import Sample from './component/sample';
import UserForm from './component/userDetails/userForm';
import Userlist from './component/userDetails/userlist';
import Graph from './graph';
import About from './component/about';
import TableData from './component/TableData';

function App() {
  const [user, setuser] = useState([]);

  console.log("starting")
  useEffect(() => {
    axios
      .get("http://localhost:3001/user/list")
      .then(response => setuser(response.data))
    console.log(user);
  }, []);

  return (
    <Router>

      <Routes>
        <Route path='/' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/forgotpassword' element={<ForgotPassword />} />
        <Route path='/resetpassword/:id' element={<ResetPassword user={user} />} />
      </Routes>

      <div id="page-top">
        <div id="wrapper">
          <Routes>
            <Route path='/sample' element={<Sample />} />
            <Route path='/user' element={<UserForm user={user} />} />
            <Route path='/userlist' element={<Userlist />} />
            <Route path='/graph' element={<Graph />} />
            <Route path='/about' element={<About />} />
            <Route path='/data' element={<TableData />} />
          </Routes>
        </div>
      </div>

    </Router>
  )
}

export default App