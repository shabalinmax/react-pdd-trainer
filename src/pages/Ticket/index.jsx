import React from 'react';
import './Ticket.css'
const Ticket = ({ticket, selectedTicket}) => {
    const [currentQuestion, setCurrentQuestion] = React.useState(0)
    const [correctAnswers, setCorrectAnswers] = React.useState([])
    const [incorrectAnswers, setIncorrectAnswers] = React.useState([])
const onClickAnswer = (el) => {
        if (el.is_correct) {
            setCorrectAnswers(prevState  => ([ ...prevState,   ticket[currentQuestion]] ))
            if (currentQuestion !== 19) {
                setCurrentQuestion(currentQuestion + 1)
            }
        }
        if (!el.is_correct) {
            setIncorrectAnswers(prevState  => ([ ...prevState,   ticket[currentQuestion]] ))
            if (currentQuestion !== 19) {
                setCurrentQuestion(currentQuestion + 1)
            }
        }
        }
    React.useEffect(() => {

        // console.log(correctAnswers)
        // console.log(ticket[currentQuestion])
        // console.log(correctAnswers)
        // console.log(incorrectAnswers)
    },[correctAnswers, incorrectAnswers, currentQuestion])

    // console.log([1,2,3].indexOf(5))
    return (
        <div className={"TicketWrapper"}>
            <h1>{ticket[0].ticket_number}</h1>
            <div className='TicketQuestionNumber'>
                {ticket.map(el =>
                    <button
                        key={ticket.indexOf(el)}
                        onClick={() => setCurrentQuestion(ticket.indexOf(el))}
                        style={correctAnswers.indexOf(ticket[ticket.indexOf(el)]) !== -1 ? {backgroundColor: '#319e2c'}: {} && ticket[currentQuestion]
                            === ticket[ticket.indexOf(el)]  ? {backgroundColor: '#373737', color: '#fff'} : {} && incorrectAnswers.indexOf(ticket[ticket.indexOf(el)]) !== -1 ? {backgroundColor: '#a43636', color: '#fff'}: {} }
                    >
                        {ticket.indexOf(el) + 1}
                    </button>)}
            </div>
            <div className={'TicketQuestionInfo'}>
                <h2>{ticket[currentQuestion].title}</h2>
                <div className={'TicketQuestionCurrent'} >
                    {ticket[currentQuestion].question}
                    <br/>
                    <img src={ticket[currentQuestion].image} alt="ticket"/>
                </div>
                <div className={'TicketQuestionAnswers'}>
                    {ticket[currentQuestion].answers.map(el =>
                        <button
                            disabled={correctAnswers.map(e => e.title ).indexOf(ticket[currentQuestion].title) !== -1}
                            onClick={() => onClickAnswer(el)} className={'TicketQuestionAnswer'}
                            key={el.answer_text}>
                            {el.answer_text}
                        </button>)}
                </div>
            </div>
        </div>
    );
};

export default Ticket;
