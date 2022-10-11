import React from 'react';
import './Registration.css'
import { useNavigate } from "react-router-dom";

const Registration = ({ register, setRegisterEmail, setRegisterPass }) => {
    const navigate = useNavigate()
    const BackToRegisterOrLogIn = () => {
        navigate('/')
    }

    return (
        <div className={'registration'}>
            <h1>зарегистрироваться</h1>
            <div>
                <input placeholder={'E-mail...'} className={'setRegisterEmail'} onChange={(event) => setRegisterEmail(event.target.value)} type="text"/>
                <input placeholder={'Пароль...'} className={'setRegisterPass'} onChange={(event) => setRegisterPass(event.target.value)}  type="password"/>
                    <button onClick={() => register()}>
                        зарегистрироваться
                    </button>
                    <button onClick={() => BackToRegisterOrLogIn()}>
                        назад
                    </button>
            </div>
        </div>
    );
};

export default Registration;
