import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

const ReservationPage = () => {
    const { id } = useParams()
    const [modalTerminZajety, setModalTerminZajety] = useState(false)
    const [modalSukces, setModalSukces] = useState(false)

    const toggleModalTerminZajety = () => {
        setModalTerminZajety(!modalTerminZajety)
    }

    const toggleModalSukces = () => {
        setModalSukces(!modalSukces)
    }

    function handleSubmit(e) {
        e.preventDefault()
        console.log("joke lol");
        const formData = new FormData(e.target);
        const user = formData.get('user');
        const date = formData.get('reservation-date');
        const time = formData.get('reservation-time');
        const itemId = formData.get('item-id');

        const reservationData = {
            uzytkownik: user,
            przedmiot_id: itemId,
            data_rezerwacji: date,
            godzina_rezerwacji: time
        };

        console.log(reservationData);

        fetch('http://localhost:3000/api/rezerwacje', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reservationData)
        })
        .then(response => {
            if (!response.ok) {
                if (response.status === 409) {
                    toggleModalTerminZajety()
                }
                throw new Error('Network response was not ok');
            }

            console.log('Reservation submitted successfully!');
            toggleModalSukces()
        })
        .catch(error => {
            console.error('Error submitting reservation:', error);
        });
    }

  return (
    <div className="wrapper">
        <div className='reservationPage'>
            <h1>Rezerwacja przedmiotu nr {id}</h1>
            <h3>Przedmiot będzie zarezerwowany przez 60 minut poczynając od wybranej godziny.</h3>
            <form onSubmit={handleSubmit} className='new-reservation-form'>

                <label htmlFor="user">Imię i nazwisko: </label>
                <input type="text" id='user' name='user' placeholder="Jan Kowalski" required/>
                <br />

                <label htmlFor="reservation-date">Data rezerwacji: </label>
                <input type="date" id='reservation-date' name='reservation-date' required/>
                <br />

                <label htmlFor="resevation-time">Godzina rezerwacji: </label>
                <input type="time" id='reservation-time' name='reservation-time' required/>
                <br />

                <input type="hidden" name="item-id" id="item-id" value={id}/>

                <input type="submit" value="Rezerwuj"/>
            </form>
        </div>

        {modalTerminZajety && <div className="modal">
            <div className="overlay"></div>
            <div className="modal-content">
                <h3>Termin zajęty :c</h3>
                <p>Przedmioty niedostępny, wybierz inny termin</p>
                <button className="close-modal" onClick={toggleModalTerminZajety}>Zamknij</button>
            </div>
        </div>}

        {modalSukces && <div className="modal">
            <div className="overlay"></div>
            <div className="modal-content">
                <h3>Udało się!</h3>
                <p>Przedmioty zarezerwowany w wybranym terminie.</p>
                <button className="close-modal" onClick={toggleModalSukces}>Zamknij</button>
                <Link to={"/"}><button className='main-page-btn' >Strona główna</button></Link>
            </div>
        </div>}
    </div>
  )
}

export default ReservationPage