import React from 'react'
import { Link } from "react-router-dom";
import { useState } from 'react'


export default function NavBar() {

    const [searchText, setSearchText] = useState('');

    function changeHandler(e) {

        setSearchText(e.target.value);
    }
    function submitHandler(e) {

        e.preventDefault();
        window.open(`https://www.google.com/search?q=${searchText}&rlz=1C1CHBF_enIN924IN924&oq=${searchText}&aqs=chrome..69i57j46i67i433j0i67j0i67i433j46i67i433j69i60l3.906j0j7&sourceid=chrome&ie=UTF-8`);

        setSearchText('')
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Exercise Logs</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to='/exercise'>Add Exercise</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/user'>Add User</Link>
                            </li>

                        </ul>
                        <form className="d-flex">
                            <input className="form-control mr-sm-2" type="search" value={searchText} onChange={changeHandler} placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success my-2 my-sm-0" onClick={submitHandler} >Search</button>
                        </form>
                    </div>
                </div>
            </nav>

        </div>
    )
}
