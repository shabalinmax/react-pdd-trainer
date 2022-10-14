import React from 'react';
import './Ticket.css'
const Ticket = ({ticket, selectedTicket}) => {
    const [currentQuestion, setCurrentQuestion] = React.useState(0)
    console.log(ticket[currentQuestion].image)
    return (
        <div className={"TicketWrapper"}>
            <h1>{ticket[0].ticket_number}</h1>
            <div className='TicketQuestionNumber'>
                {ticket.map(el =>
                    <button key={ticket.indexOf(el)} onClick={() => setCurrentQuestion(ticket.indexOf(el))} style={ticket.indexOf(el) === currentQuestion ? {backgroundColor: '#bcbcbc'} : {} }>
                        {ticket.indexOf(el) + 1}
                    </button>)}
            </div>
            <div className={'TicketQuestionInfo'}>
                <h2>{ticket[currentQuestion].title}</h2>
                <div className={'TicketQuestionCurrent'} >
                    {ticket[currentQuestion].question}
                    <br/>
                    <img src={ticket[currentQuestion].image} alt="logo"/>

                </div>
                <div className={'TicketQuestionAnswers'}>

                </div>
            </div>
        </div>
    );
};

export default Ticket;
