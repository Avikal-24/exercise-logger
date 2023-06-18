import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react';
import { Link } from "react-router-dom";
import { formatDate } from "../utils/dateUtil";

export function Row(props) {


    return (
        <>
            <tr>
                <th scope="row">{props.ele.username}</th>
                <td>{props.ele.name}</td>
                <td>{props.ele.duration}</td>
                <td>{props.ele.date}</td>
                <td><Link to={'/edit/' + props.ele.id} >edit</Link> | <a href='#' onClick={() => { props.deleteExercise(props.ele.id) }} >delete</a></td>
            </tr>

        </>
    )
}

export default function ExerciseLog() {

    const [exercise, setExercise] = useState([{
        id: '',
        username: '',
        name: '',
        duration: '',
        date: ''
    }]);


    useEffect(() => {

        // console.log('1. UseEffect called')
        axios.get('/exercise').then((response) => {
            let tmpState = []
            let data = response.data;
            data.forEach(element => {
                let tmpObj = {
                    id: element._id,
                    username: element.username,
                    name: element.name,
                    duration: element.duration,
                    date: formatDate(element.date),
                }
                tmpState.push(tmpObj);
            });

            setExercise(tmpState);


        }).catch((err) => {

            console.log('Error in making axios get req for exercise: ' + err)
        })

    }, []);

    function deleteExercise(id) {

        axios.delete(`/exercise/${id}`).then((response) => {

            let tmpState = []

            exercise.forEach((ele) => {
                if (ele.id !== id) {
                    tmpState.push(ele)
                }

            })

            // console.log('Temp state from deleteExercise(): ', tmpState)
            setExercise(tmpState);
            displayLogs();

        }).catch((err) => {
            console.log('Error in delete request from axios: ' + err)
        })
    }




    function displayLogs() {

        // console.log('3. displayLogs called')
        return exercise.map((ele) => {
            return <Row ele={ele} deleteExercise={deleteExercise} />
        })

    }
   

    return (


        <div>

            <h1 className="display-4 mt-2">Exercise Log</h1>

            <table className="table table-hover ">
                <thead>
                    <tr>
                        <th scope="col">Username</th>
                        <th scope="col">Exercise Name</th>
                        <th scope="col">Duration</th>
                        <th scope="col">Date</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {displayLogs()}
                </tbody>
            </table>

        </div>
    )
}
