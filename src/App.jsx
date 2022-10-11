import React from "react";
import {createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword} from 'firebase/auth'
import {doc, getDoc, collection, addDoc, setDoc} from 'firebase/firestore'
import {auth, db} from "./firebase-config";
import { Routes, Route, Link , useNavigate} from "react-router-dom";
import RegisterOrLoginPage from "./pages/RegisterOrLoginPage";
import Registration from './pages/Registration'
import Login from "./pages/Login";
import MainMenu from "./pages/MainMenu";
import './App.css';

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

    const usersData = collection(db, 'users')
    const addDataRegistration = async () => {
        await setDoc(doc(db, "users", registerEmail), {
            1: false,
            2: false,
            3: false,
            4: false,
            5: false,
            6: false,
            7: false,
            8: false,
            9: false,
            10: false,
            11: false,
            13: false,
            14: false,
            15: false,
            16: false,
            17: false,
            18: false,
            19: false,
            20: false,
            21: false,
            22: false,
            23: false,
            24: false,
            25: false,
            26: false,
            27: false,
            28: false,
            29: false,
            30: false,
            31: false,
            32: false,
            33: false,
            34: false,
            35: false,
            36: false,
            37: false,
            38: false,
            39: false,
            40: false,
        });
    }

    const register = async () => {
        try {
            const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPass)
            addDataRegistration()
            navigate('/login')


        } catch (error) {
            alert(
                'убетитесь, что вы ввели верный e-mail, а ваш пароль содержит больше 6 символов'
            )
            console.log(error.message)
        }
    }
    const login = async () => {
        try {
            const user = await signInWithEmailAndPassword(
                auth,
                loginEmail,
                loginPassword
            );
            navigate('/main')
            console.log(user);

        } catch (error) {
            console.log(error.message);
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
                    login={login}
                    setLoginEmail={setLoginEmail}
                    setLoginPass={setLoginPassword}
             />}/>
            <Route path={'/main'} element={
                <MainMenu
                    user={user}
            />}/>
        </Routes>
    </div>
  );
}

export default App;
