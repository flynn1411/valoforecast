import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage'
import Matches from './components/MatchHistory/Matches'
import MatchForm from './components/MatchHistory/MatchForm'
import CurrentRank from './components/CurrentRank/CurrentRank'
import RankPrediction from './components/RankPrediction/RankPrediction'
import Partida from './interfaces/Partida'
import { useState } from 'react'
import Rango from './interfaces/Rank'
import DesiredRank from './components/RankPrediction/DesiredRank'

let listaDePartidas: Partida[] = []
let rangoActual: Rango = {
  name: "UnRanked",
  MMR: 0,
  color: "#ffffff",
  img: "",
  RR: 0
}

let rangoDeseado: Rango = {
  name: "UnRanked",
  MMR: 0,
  color: "#ffffff",
  img: "",
  RR: 0
}

  if(localStorage.getItem("MATCHES")){
    listaDePartidas = JSON.parse(`${localStorage.getItem("MATCHES")}`);
  }
  
  if(localStorage.getItem("CURRENT_RANK")){
    rangoActual = JSON.parse(`${localStorage.getItem("CURRENT_RANK")}`);
  }
  
  if(localStorage.getItem("DESIRED_RANK")){
    rangoDeseado = JSON.parse(`${localStorage.getItem("DESIRED_RANK")}`);
  }

function App() {

  const [currentMatches, setCurrentMatches] = useState<Partida[]>(listaDePartidas);
  const [currentRank,setCurrentRank] = useState<Rango>(rangoActual);
  const [desiredRank,setDesiredRank] = useState<Rango>(rangoDeseado);

  function addMatch(newMatch: Partida){
    const newMatches: Partida[] = [...currentMatches, newMatch];
    setCurrentMatches(newMatches);

    localStorage.setItem("MATCHES", JSON.stringify(newMatches));
  }

  function setNewRank(newRank:Rango){
    setCurrentRank(newRank);
    localStorage.setItem("CURRENT_RANK", JSON.stringify(newRank));
  }

  function setNewDesiredRank(newDesiredRank:Rango){
    setDesiredRank(newDesiredRank);
    localStorage.setItem("DESIRED_RANK", JSON.stringify(desiredRank));
  }

  return (
    <main className="bg-fondo w-screen h-screen grid place-items-center">
      <BrowserRouter>
        <Routes>

          /**Ruta principal */
          <Route path='/' element={<HomePage/>}/>

          <Route path='matchHistory' element={<Matches currentMatches={currentMatches} setCurrentMatches={setCurrentMatches}/>}/>

          <Route path='newMatch' element={<MatchForm addMatch={addMatch}/>}/>

          <Route path='currentRank' element={<CurrentRank currentRank={currentRank} setNewRank={setNewRank} currentColor={currentRank.color}/>}/>

          <Route path='predictRank' element={<RankPrediction currentRank={currentRank} desiredRank={desiredRank} setDesiredRank={setNewDesiredRank} matches={currentMatches}/>}/>
          
          <Route path='desiredRank' element={ <DesiredRank desiredRank={desiredRank} currentColor={desiredRank.color} setNewDesiredRank={setNewDesiredRank}/> } />

        </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App
