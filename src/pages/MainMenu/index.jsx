import React from 'react';
import './MainMenu.css'
import { signOut } from 'firebase/auth'
import {auth, db} from "../../firebase-config";
import { useNavigate,  } from "react-router-dom";
import {addDoc, collection, doc, setDoc, updateDoc} from 'firebase/firestore'
const MainMenu = ({user}) => {
    const exit = async () => {
            await signOut(auth)
    }
    const navigate = useNavigate()
    const redirect = () => {
        navigate('/')
    }
    const usersData = collection(db, 'users', )
    const test = async () => {


        // await updateDoc(doc(db, "users", user.email ), {
        //     1: true,
        // })
           // allows you to update a specific line in the collection (can be used when the user has passed one of test )
    }
    return (
        user === null ? redirect() :
            <div className='MainMenu'>
                <div className="headerMainMenu">
                    {user?.email}
                    <button onClick={() => exit()}>выйти</button>
                </div>

            </div>
    );
};

export default MainMenu;
