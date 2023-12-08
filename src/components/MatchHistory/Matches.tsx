import { useState } from "react";
import HomeButton from "../HomeButton";
import Partida from "../../interfaces/Partida";
import { v4 as uuid } from "uuid";

/*let listaDePartidas: Partida[] = [
  {kills: 15, deaths: 10, assists: 4, econ: 110, first_bloods: 2, defuses: 1, plants: 4, RR: 21, date: "24/11/2023"},
  {kills: 11, deaths: 16, assists: 2, econ: 240, first_bloods: 4, defuses: 3, plants: 3, RR: -11, date: "28/11/2023"}
]*/

let listaDePartidas: Partida[] = []

if(localStorage.getItem("MATCHES")){
  listaDePartidas = JSON.parse(`${localStorage.getItem("MATCHES")}`);
}


function Matches(){

  const [currentMatches] = useState<Partida[]>(listaDePartidas);

  function getColor(rr:number){
    if (rr >= 0){
      return "p-2 whitespace-nowrap bg-verde/50"
    }else{
      return "p-2 whitespace-nowrap bg-rojo/50"
    }
  }

  function renderMatches(){
    return currentMatches.map((cPartida)=>{
      return (
        <tr className={getColor(cPartida.RR)} key={uuid()} >
          <td><div className="font-medium text-center">{cPartida.date}</div></td>
          <td><div className="font-medium text-center">{cPartida.kills}</div></td>
          <td><div className="font-medium text-center">{cPartida.deaths}</div></td>
          <td><div className="font-medium text-center">{cPartida.assists}</div></td>
          <td><div className="font-medium text-center">{cPartida.defuses}</div></td>
          <td><div className="font-medium text-center">{cPartida.plants}</div></td>
          <td><div className="font-medium text-center">{cPartida.econ}</div></td>
          <td><div className="font-medium text-center">{cPartida.first_bloods}</div></td>
          <td><div className="font-medium text-center">{cPartida.RR}</div></td>
        </tr>
      )
    })
  }

  return(
    <div className="w-full h-full grid place-items-center">
      <h1 className="font-titulo text-6xl">Datos Históricos</h1>
      <div>
        <table className="table-auto w-full font-ubuntu text-texto1 border-2 border-white">
          <thead className="text-xs font-bold uppercase bg-texto1 text-header">
            <tr>
              <th className="p-2 whitespace-nowrap">
                  <div className="font-bold text-center">Fecha</div>
              </th>
              <th className="p-2 whitespace-nowrap">
                  <div className="font-bold text-center">Asesinatos</div>
              </th>
              <th className="p-2 whitespace-nowrap">
                  <div className="font-bold text-center">Muertes</div>
              </th>
              <th className="p-2 whitespace-nowrap">
                  <div className="font-bold text-center">Asistencias</div>
              </th>
              <th className="p-2 whitespace-nowrap">
                  <div className="font-bold text-center">Desactivaciones</div>
              </th>
              <th className="p-2 whitespace-nowrap">
                  <div className="font-bold text-center">Activaciones</div>
              </th>
              <th className="p-2 whitespace-nowrap">
                  <div className="font-bold text-center">Economía</div>
              </th>
              <th className="p-2 whitespace-nowrap">
                  <div className="font-bold text-center">Primer Encuentro</div>
              </th>
              <th className="p-2 whitespace-nowrap">
                  <div className="font-bold text-center">+/-</div>
              </th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-texto1">
            {renderMatches()}
          </tbody>
        </table>
      </div>
      <HomeButton/>
    </div>
  );
}

export default Matches;