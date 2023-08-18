import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignUp({ BASE_URL }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, seterror] = useState('')

    const navigate = useNavigate()
    const handleSignUp = async (event) => {
        event.preventDefault();
        try {
            const user = {
                username,
                email,
                password
            }
            const response = await axios.post(`${BASE_URL}/user/signup`, user)
            console.log(response.data);
            var msg = response.data.message
            // seterror(response.data.error);

        } catch (error) {
            console.log("Error in adding user :", error)
            seterror(error.response.data.error);
        }
        if (msg === 'User added successfully') {
            navigate('/')
        }
    }
    return (
        <div className='login-body'>
            <div className="container login-container">
                <div className="d-flex justify-content-center h-100">
                    <div className="card login-card">
                        <div className="card-header login-card-header">
                            <h3>Sign Up</h3>

                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSignUp} >
                                <div className="input-group form-group">
                                    <div className="input-group-prepend login-input-group">
                                        <span className="input-group-text"><i className="fas fa-user"></i></span>
                                    </div>
                                    <input type="text" className="form-control login-input"
                                        value={username} onChange={(e) => setUsername(e.target.value)}
                                        placeholder="username" required />

                                </div>

                                <div className="input-group form-group">
                                    <div className="input-group-prepend login-input-group">
                                        <span className="input-group-text"><i className="fas fa-envelope"></i></span>
                                    </div>
                                    <input type="mail" className="form-control login-input"
                                        value={email} onChange={(e) => setEmail(e.target.value)}
                                        placeholder="usermail id" required />

                                </div>
                                <div class="input-group form-group">
                                    <div className="input-group-prepend login-input-group">
                                        <span className="input-group-text"><i className="fas fa-key"></i></span>
                                    </div>
                                    <input type="password" className="form-control"
                                        value={password} onChange={(e) => setPassword(e.target.value)}
                                        placeholder="password" required />
                                </div>
                                <div class="form-group">
                                    <button type='submit' className="btn float-right login_btn" >sign up</button>
                                    <p className='text-center error' >{error}</p>
                                </div>
                            </form>
                        </div>
                        <div className="card-footer">
                            <div className="d-flex justify-content-center links">
                                Already have an account?<a href="/">Sign In</a>

                            </div>
                        </div>
                        <br /><br />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp;