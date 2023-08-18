import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function ResetPassword({ user, BASE_URL }) {
    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');
    const [error, seterror] = useState('');
    const [profile, setprofile] = useState({});

    const id = useParams().id;
    console.log(id)
    console.log(user)
    const navigate = useNavigate();
    useEffect(() => {
        const finduser = user.find(data => data.id == id);
        setprofile(finduser)
        console.log(profile);
    }, [])

    const handleSignIn = async (event) => {
        event.preventDefault();
        if (password === cpassword) {
            try {
                const users = {
                    password,
                    id
                }
                const response = await axios.post(`${BASE_URL}/user/reset`, users)
                console.log(response.data)
                if (response.data.message == "password updated successfully") {
                    navigate('/')
                }
            } catch (error) {
                console.log("Error in signin user :", error)
                seterror(error.response.data.error)
            }
        } else {
            seterror("password doesnot match")
        }
    };

    return (
        <div className='login-body'>
            <div className="container login-container">
                <div className="d-flex justify-content-center h-100">
                    <div className="card login-card">
                        <div className="card-header login-card-header">
                            {/* <h3>Welcome back,{profile.username}</h3> */}

                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSignIn}>
                                <div className="input-group form-group p-2">
                                    <div className="input-group-prepend login-input-group ">
                                        <span className="input-group-text"><i className="fas fa-key"></i></span>
                                    </div>
                                    <input type="password" className="form-control"
                                        value={password} onChange={(e) => setPassword(e.target.value)}
                                        placeholder="New password" required />
                                </div>
                                <div className="input-group form-group p-2">
                                    <div className="input-group-prepend login-input-group">
                                        <span className="input-group-text"><i className="fas fa-unlock-alt"></i></span>
                                    </div>
                                    <input type="password" className="form-control"
                                        value={cpassword} onChange={(e) => setCpassword(e.target.value)}
                                        placeholder="Confirm password" required />
                                </div>
                                <div className="form-group">
                                    <input type="submit" value="Reset" className="btn float-right login_btn" />
                                    <p className='text-center error' >{error}</p>
                                </div>

                                <div className="d-flex justify-content-center links">
                                    If the link is invalid .pls,rend the mail:<a href="/forgotpassword">resend mail</a>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword;