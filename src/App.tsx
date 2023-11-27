import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage'
import Matches from './components/MatchHistory/Matches'
import MatchForm from './components/MatchHistory/MatchForm'
import CurrentRank from './components/CurrentRank/CurrentRank'
import RankPrediction from './components/RankPrediction/RankPrediction'

function App() {

  return (
    <main className="bg-fondo w-screen h-screen grid place-items-center">
      <BrowserRouter>
        <Routes>

          /**Ruta principal */
          <Route path='/' element={<HomePage/>}/>

          <Route path='matchHistory' element={<Matches/>}/>

          <Route path='newMatch' element={<MatchForm/>}/>

          <Route path='currentRank' element={<CurrentRank/>}/>

          <Route path='predictRank' element={<RankPrediction/>}/>

        </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App
