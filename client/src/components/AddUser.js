import React from 'react'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
// import { createHashHistory } from "history";
const axios = require('axios')
require('dotenv').config()

export default function AddUser() {

    const navigate = useNavigate()
    const [user, setUser] = useState('');

    function changeHandler(e) {
        setUser(e.target.value);
    }

    function addUser() {

        let data = {
            username: `${user}`
        }
        // console.log(data)
        axios.post('/user/add', data)
            .then(function (response) {
                console.log(response);
            }).catch(err => {
                console.log("Error in post req from axios:" + err)
            })

        setUser('');

        // window.location.assign(process.env.BASE_URL)
        navigate('/') 

    }

    return (
        <div>
            {console.log(`BASE_URL:  ${process.env.BASE_URL}`)}
            <form>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label mt-4" >Enter Username</label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" onChange={changeHandler} placeholder="Username" />
                    <button type="button" className="btn btn-primary mt-4" onClick={addUser}>Submit</button>
                </div>
            </form>

        </div>
    )
}
