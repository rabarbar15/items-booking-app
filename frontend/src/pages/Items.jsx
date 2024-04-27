import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Items = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/przedmioty")
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Network response was not ok');
        }
      })
      .then(jsonRes => {
        setItems(jsonRes)
        setLoading(false)
      })
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  if (loading) {
    return <div className='wrapper'>
      <div className="itemsList">
        <h2>Loading...</h2>
      </div>
    </div>;
  }

  if (items.length === 0) {
    return <div className='wrapper'>
      <div className="itemsList">
        <h2>No items available</h2>
      </div>
    </div>;
  }

  return (
    <div className="wrapper">
      <div className='itemsList'>
        <h1>Lista przedmiotów do wypożyczenia</h1>
        <ul>
          {items.map((item) => (
            <li key={item.id} className='item'>
              {item.nazwa}
              <Link to={`/przedmioty/${item.id}`}>
                <button className="detailsBtn">Szczegóły</button>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      </div>
  );
}

export default Items;
