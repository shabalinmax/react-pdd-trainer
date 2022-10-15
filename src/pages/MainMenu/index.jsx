import React from 'react';
import { signOut } from 'firebase/auth'
import {auth, db, realtimeDB} from "../../firebase-config";
import { useNavigate  } from "react-router-dom";
import {child, get} from "firebase/database";

import './MainMenu.css'
const MainMenu = ({user,toStartSolvingTicket}) => {
    const [isDownloaded, setIsDownloaded ] = React.useState(false)
    const navigate = useNavigate()
    const redirectToStart = () => {
        navigate('/')
    }
    const exit = async () => {
            await signOut(auth)
    }
    const [tickets, setTickes] = React.useState()
    const getStartData = async () => {
        await get(child(realtimeDB, user.uid)).then((snapshot) => {
            if (snapshot.exists()) {
                setTickes(snapshot.val());
                // setIsDownloaded(true)
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }
    React.useEffect(() => {
        getStartData().then(r => setIsDownloaded(true))
    }, [isDownloaded, user ])
    //ВАЖНО, НАДО ПОДУМАТЬ, КАК СДЕЛАТЬ, ЧТОБЫ ОТОБРАЖАЛИСЬ БИЛЕТЫ ПРИ ПЕРЕЗАГРУЗКЕ
    return (
        user === null ? redirectToStart() :
            <div className='MainMenuWrapper'>
                <div  className="headerMainMenu">
                    {user?.email}
                    <button onClick={() => exit()}>выйти</button>
                </div>
                <div className={'MainMenuDescription'}>
                    <h1>Выбери билет и ответь на все вопросы</h1>
                    <h2>Помни, на все вопрсы есть всего 20 минут!</h2>
                    <h3>цель — окрасить все билеты в этот цвет </h3>
                </div>
                <div className="MainMenuTickets">
                    {tickets?.map(el =>
                        <button onClick={() => toStartSolvingTicket(el)} style={el[1] === 'solved' ? {backgroundColor: '#55937a'} : {backgroundColor: '#6878b9'}} key={el[0]}> {el[0] + 1 }</button>
                    )}
                </div>
            </div>
    );
};

export default MainMenu;
