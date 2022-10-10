import React from 'react';
import './Login.css'
import { useNavigate } from "react-router-dom";

const Login = ({setLoginEmail,setLoginPass}) => {
    const navigate = useNavigate()
    const BackToRegisterOrLogIn = () => {
        navigate('/')
    }
    const toLogin = () => {

        // navigate('/home')
        console.log('done')
    }
    return (
        <div className={'loginWrapper'}>
            <h1>войти</h1>
            <div>
                <input className={'setLoginEmail'} onChange={(event) => setLoginEmail(event.target.value)} type="text"/>
                <input className={'setLoginPass'} onChange={(event) => setLoginPass(event.target.value)} type="password"/>
                <button onClick={() => toLogin()}>
                    войти
                </button>
                <button onClick={() => BackToRegisterOrLogIn()}>
                    назад
                </button>

            </div>
        </div>
    );
};

export default Login;
