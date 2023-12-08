import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage'
import Matches from './components/MatchHistory/Matches'
import MatchForm from './components/MatchHistory/MatchForm'
import CurrentRank from './components/CurrentRank/CurrentRank'
import RankPrediction from './components/RankPrediction/RankPrediction'
import Partida from './interfaces/Partida'
import { useState } from 'react'

let listaDePartidas: Partida[] = []

  if(localStorage.getItem("MATCHES")){
    listaDePartidas = JSON.parse(`${localStorage.getItem("MATCHES")}`);
  }

function App() {

  const [currentMatches, setCurrentMatches] = useState<Partida[]>(listaDePartidas);

  function addMatch(newMatch: Partida){
    const newMatches: Partida[] = [...currentMatches, newMatch];
    setCurrentMatches(newMatches);

    localStorage.setItem("MATCHES", JSON.stringify(currentMatches));
  }

  return (
    <main className="bg-fondo w-screen h-screen grid place-items-center">
      <BrowserRouter>
        <Routes>

          /**Ruta principal */
          <Route path='/' element={<HomePage/>}/>

          <Route path='matchHistory' element={<Matches currentMatches={currentMatches} setCurrentMatches={setCurrentMatches}/>}/>

          <Route path='newMatch' element={<MatchForm addMatch={addMatch}/>}/>

          <Route path='currentRank' element={<CurrentRank/>}/>

          <Route path='predictRank' element={<RankPrediction/>}/>

        </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App
