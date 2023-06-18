import { useParams, useNavigate } from "react-router-dom";
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { formatDate } from "../utils/dateUtil";

const axios = require('axios')


export default function EditExercise(props) {

    const navigate = useNavigate()

    const [exercise, setExercise] = useState({
        username: '',
        name: '',
        duration: '',
        date: ''
    });
    const [userlist, setUserlist] = useState([]);
    const { id } = useParams()


    useEffect(() => { //executed on every component render to the page (similar to componentDisMount(), lifecycle component in react)

        axios.get(`/exercise/${id}`)
            .then((response) => {
                console.log("response data ", response.data);
                if (!exercise.username) {
                    setExercise({
                        username: response.data.username,
                        name: response.data.name,
                        duration: response.data.duration,
                        date: response.data.date,
                    })
                }

            }).catch(err => {
                console.log("Error in get user req from axios:" + err)
            })

    }, [exercise.username, id]);

    useEffect(() => {

        axios.get('/user') //gets all users for dropdown list
            .then((response) => {
                // console.log("response data " ,response.data);
                let data = response.data;
                let usernames = [];
                data.forEach(element => {

                    usernames.push(element.username)
                });
                // console.log('username array from axios then(): ' , usernames)

                setUserlist(usernames)
            }).catch(err => {
                console.log("Error in get user req from axios:" + err)
            })

    }, []);


    function fetchList() {

        // console.log('State of Userlist in fetchList()' , userlist)
        return userlist.map((username) => {
            if (username !== exercise.username) {
                return (<option key={username} value={username}>{username}</option>);
            }
        })

    }


    function usernameChangeHandler(e) {
        setExercise({
            username: e.target.value,
            name: exercise.name,
            duration: exercise.duration,
            date: exercise.date

        });
    }

    function nameChangeHandler(e) {
        setExercise({
            username: exercise.username,
            name: e.target.value,
            duration: exercise.duration,
            date: exercise.date
        });
    }

    function durationChangeHandler(e) {
        setExercise({
            username: exercise.username,
            name: exercise.name,
            duration: e.target.value,
            date: exercise.date
        });
    }

    function dateChangeHandler(e) {
        setExercise({
            username: exercise.username,
            name: exercise.name,
            duration: exercise.duration,
            date: e.target.value
        });
    }

    function EditExercise() {

        // console.log('Final data before post request: ', exercise);

        axios.post(`/exercise/${id}`, exercise)
            .then(function (response) {
                console.log(response);
            }).catch(err => {
                console.log("Error in post req from axios:" + err)
            })

        setExercise('');

        window.location = '/'
        // window.location.assign('/')
        // window.location.assign('http://localhost:3000/')
        // navigate('/') 

    }

    return (
        <div>

            <form>
                <div className="mb-3">

                    <div className="input-group mt-4">
                        <div className="input-group-prepend">
                            <label className="input-group-text" htmlFor="inputGroupSelect01">Username</label>
                        </div>

                        <select className="custom-select" onChange={usernameChangeHandler} id="inputGroupSelect01" defaultValue={exercise.username}>
                            <option key={exercise.username} selected value={exercise.username}>{exercise.username}</option>

                            {fetchList()}

                        </select>
                    </div>

                    <label htmlFor="exercise" className="form-label mt-4" >Enter Exercise Name</label>
                    <input type="text" className="form-control" id="exercise" value={exercise.name} onChange={nameChangeHandler} placeholder="Exercise name" />

                    <label htmlFor="duration" className="form-label mt-4" >Enter Duration (in minutes)</label>
                    <input type="text" className="form-control" id="duration" value={exercise.duration} onChange={durationChangeHandler} placeholder="Username" />

                    <label htmlFor="Date" className="form-label mt-4" >Enter Date</label>
                    <input type="date" className="form-control" id="Date" value={formatDate(exercise.date)} onChange={dateChangeHandler} />

                    <button type="button" className="btn btn-primary mt-4" onClick={EditExercise}>Submit</button>
                </div>
            </form>

        </div>
    )
}
