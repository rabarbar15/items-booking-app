import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

const ItemPage = () => {
    const { id } = useParams()
    const [item, setItem] = useState(null)

    useEffect(() => {
        fetch(`http://localhost:3000/api/przedmioty/${id}`)
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    throw new Error("Couldn't fetch the data")
                }
            })
            .then(jsonRes => setItem(jsonRes))
            .catch(err => console.error("Error fetching data:", err))
    }, [])

  return (
    <div>
        <div className="wrapper">
            {item ? (
                    <div className='itemPage'>
                        <h1>Przedmiot nr {item.id}</h1>
                        <p><strong>Nazwa:</strong> {item.nazwa}</p>
                        <p><strong>Opis:</strong> {item.opis}</p>
                        <p><strong>Miejsce:</strong> {item.miejsce}</p>
                        <Link to={`/rezerwacja/${id}`}>
                            <button className="reservationBtn">Zarezerwuj</button>
                        </Link>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
    </div>
  )
}

export default ItemPage