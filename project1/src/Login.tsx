import React, { ChangeEvent, useState } from 'react';
import { useHistory } from "react-router-dom";

import axios from 'axios'

export const Login = () => {
    const [user, setuser] = useState({ email: '', password: '' })
    const [loginError, setloginError] = useState("")
    let history = useHistory();

    const handleLogin = () => {
        axios.post("http://localhost:9090/login", user).then((res: any) => {
            console.log(res)
            if (res.data.status == "LOGGED_IN") {
                history.push("/dashboard");
            } else {
                setloginError("Invalid Credentials ... Please Check")
            }
        })
        // axios.post('http://localhost:9090/login', {
        //     params: {
        //         user
        //     }
        // }).then(res => {
        //     console.log(res)
        // })
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        let newUser: any = { ...user }
        newUser[e.target.name] = e.target.value;
        setuser(newUser)
    }

    return (
        <div>
            <div className="row">
                <div className="col"></div>
                <div className="col">
                    <form>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input type="email" value={user.email} className="form-control" name="email" onChange={(e) => { handleChange(e) }} placeholder="Enter email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input type="password" value={user.password} className="form-control" name="password" onChange={(e) => { handleChange(e) }} placeholder="Password" />
                        </div>
                        <p style={{ color: "red" }}>{loginError}</p>

                        <button type="button" className="btn btn-primary" onClick={handleLogin}>Submit</button>
                    </form>
                </div>
                <div className="col"></div>
            </div>
        </div>
    )
}
