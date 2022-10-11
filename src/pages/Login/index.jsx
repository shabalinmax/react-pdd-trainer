import React from 'react';
import './Login.css'
import { useNavigate,  } from "react-router-dom";

const Login = ({setLoginEmail,setLoginPass,login}) => {
    const navigate = useNavigate()
    const BackToRegisterOrLogIn = () => {
        navigate('/')
    }
    return (
        <div className={'loginWrapper'}>
            <h1>войти</h1>
            <div>
                <input placeholder={'E-mail...'} className={'setLoginEmail'} onChange={(event) => setLoginEmail(event.target.value)} type="text"/>
                <input placeholder={'Пароль...'}   className={'setLoginPass'} onChange={(event) => setLoginPass(event.target.value)} type="password"/>
                <button onClick={() => login()}>
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
