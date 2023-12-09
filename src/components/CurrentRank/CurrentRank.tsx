import Rango from "../../interfaces/Rank";
import HomeButton from "../HomeButton";
import ranks from "../ranks/ranks";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";

interface CurrentRankProps{
  currentRank: Rango,
  setNewRank(param1: Rango): any,
  currentColor: string
}

function CurrentRank({
  currentRank,
  setNewRank,
  currentColor
}:CurrentRankProps){
  const rankClass:string = `font-titulo text-2xl py-4 ${currentColor}`;
  const navigate = useNavigate();

  function setRank(newRank:Rango){
    //alert(newRank.name);
    setNewRank(newRank);
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

  function saveRankData(event: React.FormEvent<HTMLFormElement>){

    event.preventDefault();

    setRank({
      name: currentRank.name,
      MMR: currentRank.MMR,
      color: currentRank.color,
      img: currentRank.img,
      RR: parseInt(`${event.currentTarget.level.value}`)
    })

    alert("¡Rango actual actualizado con éxito!");

    navigate("/");
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
          <h3 className={rankClass}>{currentRank.name}</h3>
        </div>
        <form className="grid place-items-center grid-flow-row" id="currentRank" name="currentRank" onSubmit={saveRankData}>
          <div className="pb-6">
            <label htmlFor="level" className="font-ubuntu text-2xl py-5 font-bold pr-4">Nivel (entre 0-99)</label>
            <input
              type="number"
              name="level"
              id="level"
              className="bg-fondo border-verde border-2 text-verde font-ubuntu text-xl"
              placeholder={currentRank.RR ? `${currentRank.RR}` : `0`}
              min={0}
              max={99}
            />
          </div>
          <button type="submit" form="currentRank" className="bg-verde text-fondo px-6 py-4 mb-6 font-titulo text-xl hover:bg-[#5ee7b2] w-[15vw]">
            Guardar
          </button>
        </form>
      </div>
      <HomeButton/>
    </div>
  );
}

export default CurrentRank;