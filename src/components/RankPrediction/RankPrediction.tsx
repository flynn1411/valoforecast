import { useState } from "react";
import HomeButton from "../HomeButton";
import calculateMatches from "./logica";
import PredictedMatches from "./PredictedMatches";
import GraphView from "./GraphView";
import Rango from "../../interfaces/Rank";
import { useNavigate } from "react-router-dom";
import Partida from "../../interfaces/Partida";
import Prediction from "../../interfaces/Prediction";

interface RankPredictionProps{
  currentRank: Rango,
  desiredRank: Rango,
  setDesiredRank(param1:Rango): any,
  matches: Partida[]
}

const defaultPred:Prediction ={
  matches: 0,
  predictedPoints:[{"1":0}]
}

function RankPrediction({
  currentRank,
  desiredRank,
  setDesiredRank,
  matches
}:RankPredictionProps){
  /* Ejemplo de uso
  //Info dada de las partidas
  const info = [
    [24, 14, 5, 74, 6, 2, 0],
    [11, 12, 3, 66, 1, 1, 0],
    [24, 13, 5, 75, 3, 1, 0],
    [13, 17, 10, 60, 2, 1, 0],
    [25, 17, 2, 75, 5, 1, 0],
    [10, 18, 6, 57, 1, 1, 1],
    [24, 15, 7, 71, 5, 1, 0],
  ];
  
  // Puntos de partidas históricos
  const points = [
    [24],
    [20],
    [29],
    [-19],
    [-13],
    [-21],
    [15],
  ];*/

  const [mode, setMode] = useState<string>("TABLE");
  const navigate = useNavigate();
  const [predictionCalcs, setPredictionCalcs] = useState<Prediction>(defaultPred);
  /*let listaDePartidas: Partida[] = [
  {kills: 15, deaths: 10, assists: 4, econ: 110, first_bloods: 2, defuses: 1, plants: 4, RR: 21, date: "24/11/2023"},
  {kills: 11, deaths: 16, assists: 2, econ: 240, first_bloods: 4, defuses: 3, plants: 3, RR: -11, date: "28/11/2023"}
]*/
  function predictRankUp(){
    const originalInfo:number[][] = [];
    const historicPoints:number[][] = [];

    matches.forEach(match=>{
      originalInfo.push([
        match.kills,
        match.deaths,
        match.assists,
        match.econ,
        match.first_bloods,
        match.plants,
        match.defuses
      ]);
      historicPoints.push([match.RR]);
    })

    return calculateMatches(originalInfo, historicPoints, currentRank.MMR, currentRank.RR, desiredRank.MMR);
  }
  
  //console.log('Predicciones de Puntos para Nuevas Partidas => ', calculatePoints(info, points));


  return(
    <div className="grid place-items-center">
      <h2 className="font-titulo text-4xl">Predicción de Partidas</h2>
      <div className="w-full h-max border-b border-texto1-3">
        <ul className="grid grid-flow-col text-center text-placeholder border-b border-placeholder py-4">
            <li
              onClick={()=>{setMode("TABLE")}}
              className={(mode === "TABLE" ? 'text-verde font-bold border-verde border-b-4' : 'text-texto1 hover:text-verde hover:font-bold' )}
            >
              Tabla
            </li>
            <li 
              onClick={()=>{setMode("GRAPH")}} 
              className={(mode === "GRAPH" ? 'text-verde font-bold border-verde border-b-4' : 'text-texto1 hover:text-verde hover:font-bold' )}
            >
              Gráfico
            </li>
        </ul>
      </div>
      <div className="pb-6">
        {mode === "TABLE" ? <PredictedMatches matches={matches}/> : <GraphView predictedPoints={predictionCalcs?.predictedPoints}/>}
      </div>
      <table className="pt-4 pb-10">
        <tbody>
          <tr className="font-ubuntu text-2xl py-5 font-bold pr-4"><td className="pr-10">Rango Deseado: </td><td className={desiredRank.color}>{desiredRank.name}</td></tr>
          <tr className="font-ubuntu text-2xl py-5 font-bold pr-4"><td className="pr-10">Rango Actual: </td><td className={currentRank.color}>{currentRank.name}</td></tr>
          <tr className="font-ubuntu text-2xl py-5 font-bold pr-4"><td className="pr-10">Número Posible de Partidas a Jugar: </td><td className="text-rojo">{predictionCalcs?.matches}</td></tr>
        </tbody>
      </table>
        <button
           className="bg-texto1 text-fondo px-6 py-4 mb-6 mt-8 font-titulo text-xl hover:bg-[#5ee7b2] w-[30vw]"
           onClick={()=>navigate("/desiredRank")}
        >
          Seleccionar Rango Deseado
        </button>
        <button
           className="bg-verde px-6 py-4 mb-6 font-titulo text-fondo text-2xl hover:bg-[#5ee7b2] w-[30vw]"
           onClick={()=>{setPredictionCalcs(predictRankUp())}}
        >
          Predecir rendimiento
        </button>
      <HomeButton/>
    </div>
  )
}

export default RankPrediction;