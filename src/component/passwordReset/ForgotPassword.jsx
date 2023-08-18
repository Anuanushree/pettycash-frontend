import React, { useState } from 'react';
import axios from 'axios';

function ForgotPassword({ BASE_URL }) {
    const [email, setEmail] = useState('');
    const [error, seterror] = useState('')

    const handleForgotPassword = async (event) => {
        event.preventDefault();
        try {
            const user = {
                email
            }
            const response = await axios.post(`${BASE_URL}/user/forgot`, user)
          
            console.log(response.data)
        } catch (error) {
            console.log("Error in signin user :", error);
            seterror(error.response.data.error);
        }
    };

    return (
        <div className='login-body'>
            <div className="container login-container">
                <div className="d-flex justify-content-center h-100">
                    <div className="card login-card">
                        <div className="card-header login-card-header">
                            <h3>Forgot password</h3>

                        </div>
                        <div className="card-body">
                            <form onSubmit={handleForgotPassword}>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend login-input-group">
                                        <span className="input-group-text"><i className="fas fa-user"></i></span>
                                    </div>
                                    <br /><br />

                                    <input type="email" className="form-control login-input"
                                        value={email} onChange={(e) => setEmail(e.target.value)}
                                        placeholder="usermail id" />

                                </div>
                                <div className="form-group">
                                    <input type="submit" value="Send" className="btn float-right login_btn" />
                                    <p className='text-center error'>{error}</p>
                                </div>

                                <div className="d-flex justify-content-center links">
                                    once your password update through your mail ,back to <a href="/">Sign In</a>

                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword;