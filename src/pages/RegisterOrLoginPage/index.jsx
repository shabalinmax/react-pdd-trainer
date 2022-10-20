import React from 'react';
import './RegisterOrLoginPage.css'
import { useNavigate } from "react-router-dom";
const RegisterOrLoginPage = () => {
    const navigate = useNavigate()
    const toRegistration = () => {
        navigate('/registration')
    }
    const toLogin = () => {
        navigate('/login')
    }
    return (
        <div className={'wrapperRegisterOrLoginPage'}>
           <h1>
               Добро пожаловать на ПДД тренажер
           </h1>

            <div>
                <button onClick={() => toRegistration()} className='register'>зарегистрироваться</button>
                <button onClick={() => toLogin()} className='login'>войти</button>
            </div>
        </div>
);
};

export default RegisterOrLoginPage;
