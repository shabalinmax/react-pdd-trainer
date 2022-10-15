import React from "react";
import {createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword} from 'firebase/auth'
import {auth} from "./firebase-config";
import { Routes, Route, Link , useNavigate} from "react-router-dom";
import RegisterOrLoginPage from "./pages/RegisterOrLoginPage";
import Registration from './pages/Registration'
import Login from "./pages/Login";
import MainMenu from "./pages/MainMenu";
import './App.css';
import {getDatabase, ref, set} from "firebase/database";
import Ticket from "./pages/Ticket";
import {tickets} from "./tickets";
function App() {
    const [selectedTicket, setSelectedTicket] = React.useState()
    const [loginEmail, setLoginEmail] = React.useState('')
    const [loginPassword, setLoginPassword] = React.useState('')
    const [registerEmail, setRegisterEmail] = React.useState('')
    const [registerPass, setRegisterPass] = React.useState('')
    const [user, setUser] = React.useState({})
    const navigate = useNavigate()

    React.useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            if (user !== null) {
                navigate('/main')
            }
        })

    }, [])
    function writeUserData(user) {
        const db = getDatabase();
        set(ref(db, '' + user.uid), [
            [0, 'notSolved'],
            [1, 'notSolved'],
            [2, 'notSolved'],
            [3, 'notSolved'],
            [4, 'notSolved'],
            [5, 'notSolved'],
            [6, 'notSolved'],
            [7, 'notSolved'],
            [8, 'notSolved'],
            [9, 'notSolved'],
            [10, 'notSolved'],
            [11, 'notSolved'],
            [12, 'notSolved'],
            [13, 'notSolved'],
            [14, 'notSolved'],
            [15, 'notSolved'],
            [16, 'notSolved'],
            [17, 'notSolved'],
            [18, 'notSolved'],
            [19, 'notSolved'],
            [20, 'notSolved'],
            [21, 'notSolved'],
            [22, 'notSolved'],
            [23, 'notSolved'],
            [24, 'notSolved'],
            [25, 'notSolved'],
            [26, 'notSolved'],
            [27, 'notSolved'],
            [28, 'notSolved'],
            [29, 'notSolved'],
            [30, 'notSolved'],
            [31, 'notSolved'],
            [32, 'notSolved'],
            [33, 'notSolved'],
            [34, 'notSolved'],
            [35, 'notSolved'],
            [36, 'notSolved'],
            [37, 'notSolved'],
            [38, 'notSolved'],
            [39, 'notSolved'],
            ]);
    }

    const register = async () => {
        try {
            const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPass)
            writeUserData(user.user)
            navigate('/login')
        } catch (error) {
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

        } catch (error) {
            console.log(error.message);
        }
    }
    const toStartSolvingTicket = (ticket) => {
        navigate('/ticket')
        setSelectedTicket(ticket[0])
        console.log(ticket)
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
                    // toStartSolvingTicket={toStartSolvingTicket}
                    user={user}
            />}/>
            <Route path={'/ticket'} element={
                <Ticket
                    selectedTicket={selectedTicket}
                    ticket={tickets[selectedTicket]}
                />}/>

        </Routes>
    </div>
  );
}

export default App;
