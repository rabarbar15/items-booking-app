import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <div className="wrapper">
        <div className="homePage">
          <h1>Rezerwacje przedmiotów</h1>
            <p>Witaj na stronie rezerwacje przedmiotów! 
            Wciśnij poniższy przycisk, by wyświetlić listę dostępnych przedmiotów. 
            Każdy z nich ma osobną podstronę, gdzie można znaleźć więcej szczegółów na ich temat oraz wykonać rezerwację.
            Będzie ona trwać 60 minut, poczynając od wybranej godziny.</p>
            
            <Link to={'/przedmioty'}>
              <button>Lista przedmiotów</button>
            </Link>
        </div>
      </div>
    </div>
  )
}

export default Home