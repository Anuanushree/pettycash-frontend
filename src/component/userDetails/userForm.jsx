import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import '../../app.css';
import axios from 'axios';
import Dashboard from '../../dashboard/Dashboard';
import { useNavigate } from 'react-router-dom';



function UserForm({ user, BASE_URL }) {
    const [username, setusername] = useState('');
    const [userLname, setuserLname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [gender, setgender] = useState('');
    const [address, setAddress] = useState('');
    const [profession, setProfession] = useState('');
    const [profile, setprofile] = useState();


    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('id')
    useEffect(() => {
        const findUser = user.find(data => data.id == id);
        if (findUser) {
            setusername(findUser.username);
            setEmail(findUser.email);
            setAddress(findUser.address);
            setPhone(findUser.phone);
            setuserLname(findUser.userLname);
            setProfession(findUser.profession);
            setgender(findUser.gender);

        }
        else {
            console.log('user not found')
        }
    }, [user]);

    console.log(token);
    console.log(user);


    const getimage = async () => {
        const formData = new FormData();
        formData.append('profile', profile)
        formData.append('id', id)
        console.log(profile)
        try {
            const response = await axios.post(`${BASE_URL}/image`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            console.log(response.data);
        } catch (error) {
            console.log("error in img: ", error)
        }
    };
    const handleUserEdit = async (event) => {
        event.preventDefault();

        const headers = {
            headers: { "authorization": `${token}` }
        }
        const profilename = profile.name;
        console.log(profilename);
        const userUpdate = {
            username,
            userLname,
            email,
            phone,
            address,
            profilename,
            gender,
            profession,
        }
        try {

            const response = await axios.put(`${BASE_URL}/user/updateuser`, userUpdate, headers);

            console.log(response.data);
        } catch (error) {
            console.log("Error in userEdit: ", error)
        }
        getimage();
        navigate('/userlist')
    }
    return (
        <>
            <Dashboard />

            <div className='card user-body mx-auto d-flex justify-content-center background '>
                <form onSubmit={handleUserEdit}>

                    <div className="form-outline mb-4">
                        <input className="form-control" type="file"
                            accept='image/*' onChange={(e) => setprofile(e.target.files[0])} required
                        />
                        <label className="form-label" >Upload your profile</label>
                    </div>
                    <div className="row mb-4">
                        <div className="col-md-6">
                            <div className="form-outline">
                                <input type="text" className="form-control"
                                    value={username} onChange={(e) => setusername(e.target.value)} required />
                                <label className="form-label">First name</label>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-outline">
                                <input type="text" className="form-control"
                                    value={userLname} onChange={(e) => setuserLname(e.target.value)} required />
                                <label className="form-label" >Last name</label>
                            </div>
                        </div>
                    </div>

                    <div className="form-outline mb-4">
                        <textarea className="form-control" rows="4"
                            value={address} onChange={(e) => setAddress(e.target.value)} required
                        ></textarea>
                        <label className="form-label" >Address</label>
                    </div>
                    <div className="row mb-4">
                        <div className="col-md-6">
                            <div className="form-outline">
                                <input type="text" className="form-control"
                                    value={gender} onChange={(e) => setgender(e.target.value)} required />
                                <label class="form-label" for="form6Example1">Gender</label>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-outline">
                                <input type="text" className="form-control"
                                    value={phone} onChange={(e) => setPhone(e.target.value)} required />
                                <label className="form-label" >Phone number</label>
                            </div>
                        </div>
                    </div>

                    <div className="form-outline mb-4">
                        <input type="email" className="form-control"
                            value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <label className="form-label" >Email</label>
                    </div>

                    <div className="form-outline mb-4">
                        <input type="text" className="form-control"
                            value={profession} onChange={(e) => setProfession(e.target.value)} />
                        <label className="form-label" >Profession</label>
                    </div>


                    <div class="form-outline mb-4">
                        <button type="submit" className="btn btn-primary btn-block  form-control mb-4">Save</button>
                        {/* <textarea class="form-control" rows="4"></textarea>
                    <label class="form-label" >Additional information</label> */}
                    </div>




                </form>
            </div>

        </>
    )
}

export default UserForm;