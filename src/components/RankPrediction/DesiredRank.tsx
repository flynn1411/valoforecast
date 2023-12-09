import { Link } from "react-router-dom";
import Rango from "../../interfaces/Rank";
import ranks from "../ranks/ranks";
import { v4 as uuid } from "uuid";

interface DesiredRankProps{
  desiredRank: Rango,
  setNewDesiredRank(param1: Rango): any,
  currentColor: string
}

function DesiredRank({
  desiredRank,
  setNewDesiredRank,
  currentColor
}:DesiredRankProps){
  const rankClass:string = `font-titulo text-2xl py-4 ${currentColor}`;

  function setRank(newRank:Rango){
    //alert(newRank.name);
    setNewDesiredRank(newRank);
  }


  function renderRanks( tiers:Rango[] ){
    return tiers.map((rank:Rango) => {
      return (
        <div key={uuid()} onClick={()=>setRank(rank)} className="py-4 px-2">
          <img src={rank.img} alt={rank.name} />
        </div>
      )
    });
  }

  return(
    <div>
      <div className="grid place-items-center">
        <h1 className="font-titulo text-6xl py-4">Rango Actual</h1>
        <div className="grid grid-cols-9 w-[75%] gap-4 pb-4">
          {
            ranks.map((row: Rango[])=>{
              return (
                <div key={uuid()} className="grid col-span-1 grid-flow-row">{renderRanks(row)}</div>
              )
            })
          }
        </div>
        <div className="grid place-items-center grid-flow-row">
          <h3 className="font-titulo text-2xl py-2">Rango Seleccionado</h3>
          <h3 className={rankClass}>{desiredRank.name}</h3>
        </div>
      </div>
      <Link to={"/predictRank"}>
        <button className="bg-rojo text-fondo px-6 py-4 mb-6 font-titulo text-xl hover:bg-[#ff7984] w-[15vw] absolute bottom-4 right-4">
          Volver
        </button>
      </Link>
    </div>
  );
}

export default DesiredRank;