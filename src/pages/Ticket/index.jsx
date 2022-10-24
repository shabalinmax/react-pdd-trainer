import React from 'react';
import './Ticket.css'
import { getDatabase, ref, set, update } from "firebase/database";
import {useNavigate} from "react-router-dom";
import Timer from "../../components/Timer";

const Ticket = ({ticket, selectedTicket, user}) => {
    const [currentQuestion, setCurrentQuestion] = React.useState(0)
    const [correctAnswers, setCorrectAnswers] = React.useState([])
    const [allAnswers, setAllAnswers] = React.useState([])
    const [incorrectAnswers, setIncorrectAnswers] = React.useState([])
    const [isResultVisible, setIsResultVisible] = React.useState(false)
    const [seconds, setSeconds] = React.useState(20*60);

    const navigate = useNavigate()
    function success(userId) {
        const db = getDatabase();
        update(ref(db, '' + userId + '/' + selectedTicket + '/'  ), {
            1: 'solved'
        })
            .then(() => {
                navigate('/main')
            })
            .catch((error) => {
                // The write failed...
            });
    }
    function failed(userId) {
        const db = getDatabase();
        update(ref(db, '' + userId + '/' + selectedTicket + '/'  ), {
            1: 'failed'
        })
            .then(() => {
                navigate('/main')
                console.log('failed')
            })
            .catch((error) => {
                // The write failed...
            });
    }
    const onClickAnswer = (el) => {
            if (el.is_correct) {
                setCorrectAnswers(prevState  => ([ ...prevState,   ticket[currentQuestion]] ))
                setAllAnswers(prevState  => ([ ...prevState,   ticket[currentQuestion]] ))
                if (currentQuestion !== 19) {
                    setCurrentQuestion(currentQuestion + 1)
                }
            }
            if (!el.is_correct) {
                setIncorrectAnswers(prevState  => ([ ...prevState,   ticket[currentQuestion]] ))
                setAllAnswers(prevState  => ([ ...prevState,   ticket[currentQuestion]] ))
                if (currentQuestion !== 19) {
                    setCurrentQuestion(currentQuestion + 1)
                }
            }
        }
    const onClickToFinish = (correctAnswers) => {
        if (correctAnswers.length >= 20) {
            success(user.uid)
        }
        else {
            failed(user.uid)
        }
    }

    React.useEffect(() => {
        (allAnswers.length === 20 ? setIsResultVisible(true) : setIsResultVisible(false) && seconds < 0 ? setIsResultVisible(true) : setIsResultVisible(false))
    }, [allAnswers, seconds])

    return (
        <div className={"TicketWrapper"}>
            <h1>{ticket[0].ticket_number}</h1>
            <div className='TicketQuestionNumber'>
                {ticket.map(el =>
                    <button
                        key={ticket.indexOf(el)}
                        onClick={() => setCurrentQuestion(ticket.indexOf(el))}
                        style={correctAnswers.indexOf(ticket[ticket.indexOf(el)]) !== -1 ? {backgroundColor: '#319e2c', color: '#fff'}: {} && ticket[currentQuestion]
                            === ticket[ticket.indexOf(el)]  ? {backgroundColor: '#373737', color: '#fff'} : {} && incorrectAnswers.indexOf(ticket[ticket.indexOf(el)]) !== -1 ? {backgroundColor: '#a43636', color: '#fff'}: {} }
                    >
                        {ticket.indexOf(el) + 1}
                    </button>)}
            </div>
            <div className={'TicketQuestionInfo'}>
                <h2>{ticket[currentQuestion].title}</h2>
                <Timer
                    seconds ={seconds}
                    setSeconds={setSeconds}
                />

                <div className={'TicketQuestionCurrent'} >
                    {ticket[currentQuestion].question}
                    <br/>
                    <img src={ticket[currentQuestion].image} alt="ticket"/>
                </div>
                <div className={'TicketQuestionAnswers'}>
                    {ticket[currentQuestion].answers.map(el =>
                        <button
                            style={allAnswers.indexOf(ticket[currentQuestion]) !== -1 ? el.is_correct ? {backgroundColor: '#2b642a', color: '#fff'} : {backgroundColor: '#c03232', color: '#fff'} : {} }
                            disabled={allAnswers.map(e => e.title ).indexOf(ticket[currentQuestion].title) !== -1}
                            onClick={() => onClickAnswer(el)} className={'TicketQuestionAnswer'}
                            key={el.answer_text}>
                            {el.answer_text}
                        </button>)}
                </div>
            </div>
            <div style={isResultVisible ? {display: "block"} : {display: "none"}} className={'TicketResultWrapper'}>
                {correctAnswers.length === 20 ?
                        <div>
                            <img className={'sad'} src="/images/happy.png" alt=":(">
                            </img>
                            <h1 style={{color: '#139010'}}>Поздравляем!</h1>
                            <button onClick={() => onClickToFinish(correctAnswers)}>Далее</button>
                        </div>
                    :
                        <div>
                            <img className={'sad'} src="/images/sad.png" alt=":)">
                            </img>
                            <h1 style={{color: '#C03232FF'}}>Тренируйтесь!</h1>
                            <p>{correctAnswers.length === 3 || correctAnswers.length === 4 ? correctAnswers.length + ' ошибки' : correctAnswers.length + ' ошибок' }, {allAnswers.length} вопросов</p>
                            <button onClick={() => onClickToFinish(correctAnswers)}>Далее</button>
                        </div>
                }
            </div>
        </div>
    );
};
export default Ticket;
