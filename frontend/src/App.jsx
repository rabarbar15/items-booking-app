import "./style.css"

import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Items from "./pages/Items"
import ItemPage from "./pages/ItemPage"
import ReservationPage from "./pages/ReservationPage"

export default function App() {
  return <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/przedmioty" element={<Items/>} />
    <Route path="/przedmioty/:id" element={<ItemPage/>} />
    <Route path="/rezerwacja/:id" element={<ReservationPage/>} />
  </Routes>
}


