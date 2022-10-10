import './App.css';
import React from "react";
import {createUserWithEmailAndPassword, onAuthStateChanged, signOut} from 'firebase/auth'
import {auth} from "./firebase-config";
import { Routes, Route, Link } from "react-router-dom";
import RegisterOrLoginPage from "./pages/RegisterOrLoginPage";
import Registration from './pages/Registration'
import Login from "./pages/Login";
import { useNavigate } from "react-router-dom";

function App() {
    const [loginEmail, setLoginEmail] = React.useState('')
    const [loginPassword, setLoginPassword] = React.useState('')
    const [registerEmail, setRegisterEmail] = React.useState('')
    const [registerPass, setRegisterPass] = React.useState('')
    const [user, setUser] = React.useState({})

    const navigate = useNavigate()
    React.useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })
    })

    const register = async () => {
        try {
            const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPass)
            console.log(user)
            navigate('/login')

        } catch (error) {
            alert(
                'убетитесь, что вы ввели верный e-mail, а ваш пароль содержит больше 6 символов'
            )
            console.log(error.message)
        }
    }

  return (
    <div className="App">
        <Routes>
            <Route path={'/'} element={<RegisterOrLoginPage/>}/>
            <Route path={'/registration'} element={
                <Registration
                    register={register}
                    setRegisterEmail={setRegisterEmail}
                    setRegisterPass={setRegisterPass}
                />}/>
            <Route path={'/login'} element={
                <Login
                    setLoginEmail={setLoginEmail}
                    setLoginPass={setLoginPassword}
             />}/>
        </Routes>
    </div>
  );
}

export default App;
