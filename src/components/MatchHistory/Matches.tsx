import { useState } from "react";
import HomeButton from "../HomeButton";

interface Partida{
  kills: number,
  deaths: number,
  assists: number,
  econ: number,
  first_bloods: number,
  defuses: number,
  plants: number,
  RR: number,
  date: Date | string
}


let listaDePartidas: Partida[] = [
  {kills: 15, deaths: 10, assists: 4, econ: 110, first_bloods: 2, defuses: 1, plants: 4, RR: 21, date: "24/11/2023"}
]


function Matches(){

  const [currentMatches, setCurrentMatches] = useState<Partida[]>(listaDePartidas);

  function renderMatches(){
    return currentMatches.map((cPartida)=>{
      return (
        <tr className="p-2 whitespace-nowrap">
          <td><div className="font-medium text-center">{1}</div></td>
          <td><div className="font-medium text-center">{cPartida.kills}</div></td>
          <td><div className="font-medium text-center">{cPartida.deaths}</div></td>
          <td><div className="font-medium text-center">{cPartida.defuses}</div></td>
          <td><div className="font-medium text-center">{cPartida.plants}</div></td>
          <td><div className="font-medium text-center">{cPartida.RR}</div></td>
        </tr>
      )
    })
  }

  return(
    <div className="w-full h-full grid place-items-center">
      <h1 className="font-titulo text-6xl">Datos Históricos</h1>
      <div>
        <table className="table-auto w-full font-ubuntu text-texto1 border-3 border-verde">
          <thead className="text-xs font-semibold uppercase text-texto1 bg-placeholder">
            <tr>
              <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Partida No.</div>
              </th>
              <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Asesinatos</div>
              </th>
              <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Muertes</div>
              </th>
              <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Desactivaciones</div>
              </th>
              <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">+/-</div>
              </th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-gray-100">
            {renderMatches()}
          </tbody>
        </table>
      </div>
      <HomeButton/>
    </div>
  );
}

export default Matches;