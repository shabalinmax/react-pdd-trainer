import React from 'react';
import { signOut } from 'firebase/auth'
import {auth, db, realtimeDB} from "../../firebase-config";
import { useNavigate  } from "react-router-dom";
import {child, get} from "firebase/database";
import './MainMenu.css'
const MainMenu = ({user}) => {
    const [isDownloaded, setIsDownloaded ] = React.useState(false)
    const navigate = useNavigate()
    const redirectToStart = () => {
        navigate('/')
    }
    const exit = async () => {
            await signOut(auth)
    }
    const [tickets, setTickers] = React.useState()

    React.useEffect(() => {
        get(child(realtimeDB, user.uid)).then((snapshot) => {
            if (snapshot.exists()) {
                setTickers(snapshot.val());
                setIsDownloaded(true)
                console.log(tickets)
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }, [isDownloaded])


    return (
        user === null ? redirectToStart() :
            <div className='MainMenuWrapper'>
                <div  className="headerMainMenu">
                    {user?.email}
                    <button onClick={() => exit()}>выйти</button>
                </div>
                <div className="MainMenuTickets">
                    {tickets?.map(el =>
                        <button style={el[1] === 'solved' ? {backgroundColor: '#BBF7DF'} : {backgroundColor: '#6878b9'}} key={el[0]}> {el[0] + 1 }</button>
                    )}
                </div>
            </div>
    );
};

export default MainMenu;
