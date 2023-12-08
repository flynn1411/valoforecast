import { Navigate, useNavigate } from "react-router-dom";
import Partida from "../../interfaces/Partida";
import HomeButton from "../HomeButton";


function MatchForm(){
  const navigate = useNavigate();

  function addNewMatch(event: React.FormEvent<HTMLFormElement>){
    event.preventDefault();

    let newMatch: Partida = {
      kills: parseInt(`${event.currentTarget.kills.value}`),
      deaths: parseInt(`${event.currentTarget.deaths.value}`),
      assists: parseInt(`${event.currentTarget.assists.value}`),
      econ: parseInt(`${event.currentTarget.economy.value}`),
      first_bloods: parseInt(`${event.currentTarget.first_blood.value}`),
      defuses: parseInt(`${event.currentTarget.defuse.value}`),
      plants: parseInt(`${event.currentTarget.plants.value}`),
      RR: parseInt(`${event.currentTarget.rr.value}`),
      date: `${event.currentTarget.date.value}`
    }

    let matches: Partida[] = [];

    if(localStorage.getItem("MATCHES")){
      matches = JSON.parse(localStorage.getItem("MATCHES")!);
    }

    matches.push(newMatch);

    localStorage.setItem("MATCHES", JSON.stringify(matches));

    alert("¡Partida subida con éxito!");

    navigate("/")

  }

  return(
    <div className="w-full h-full grid place-items-center">
      <form className="grid grid-cols-3 gap-x-6" name="newMatch" id="newMatch" onSubmit={addNewMatch}>
        <div className="grid col-span-3">
          <h1 className="font-titulo text-6xl">Nuevo Registro de Partida</h1>
        </div>
        <div className="col-span-1 grid grid-flow-row pb-3">
          <label htmlFor="kills" className="font-ubuntu text-2xl py-5 font-bold">Asesinatos</label>
          <input type="number" name="kills" id="kills" className="bg-fondo border-verde border-2 text-verde font-ubuntu text-xl"/>
        </div>
        <div className="col-span-1 grid grid-flow-row pb-3">
          <label htmlFor="deaths" className="font-ubuntu text-2xl py-5 font-bold">Muertes</label>
          <input type="number" name="deaths" id="deaths" className="bg-fondo border-verde border-2 text-verde font-ubuntu text-xl"/>
        </div>
        <div className="col-span-1 grid grid-flow-row pb-3">
          <label htmlFor="assists" className="font-ubuntu text-2xl py-5 font-bold">Asistencias</label>
          <input type="number" name="assists" id="assists" className="bg-fondo border-verde border-2 text-verde font-ubuntu text-xl"/>
        </div>
        <div className="col-span-1 grid grid-flow-row pb-3">
          <label htmlFor="economy" className="font-ubuntu text-2xl py-5 font-bold">Puntaje de Economía</label>
          <input type="number" name="economy" id="economy" className="bg-fondo border-verde border-2 text-verde font-ubuntu text-xl"/>
        </div>
        <div className="col-span-1 grid grid-flow-row pb-3">
          <label htmlFor="first_blood" className="font-ubuntu text-2xl py-5 font-bold">Primer Encuentro</label>
          <input type="number" name="first_blood" id="first_blood" className="bg-fondo border-verde border-2 text-verde font-ubuntu text-xl"/>
        </div>
        <div className="col-span-1 grid grid-flow-row pb-3">
          <label htmlFor="defuse" className="font-ubuntu text-2xl py-5 font-bold">Desactivaciones</label>
          <input type="number" name="defuse" id="defuse" className="bg-fondo border-verde border-2 text-verde font-ubuntu text-xl"/>
        </div>
        <div className="col-span-1 grid grid-flow-row pb-3">
          <label htmlFor="plants" className="font-ubuntu text-2xl py-5 font-bold">Activaciones</label>
          <input type="number" name="plants" id="plants" className="bg-fondo border-verde border-2 text-verde font-ubuntu text-xl"/>
        </div>
        <div className="col-span-1 grid grid-flow-row pb-3">
          <label htmlFor="rr" className="font-ubuntu text-2xl py-5 font-bold">Cantidad de puntaje al rango</label>
          <input type="number" name="rr" id="rr" className="bg-fondo border-verde border-2 text-verde font-ubuntu text-xl"/>
        </div>
        <div className="col-span-1 grid grid-flow-row pb-3">
          <label htmlFor="date" className="font-ubuntu text-2xl py-5 font-bold">Fecha</label>
          <input type="date" name="date" id="date" className="bg-fondo border-verde border-2 text-verde font-ubuntu text-xl"/>
        </div>
      </form>

      <button type="submit" form="newMatch" className="bg-verde text-fondo px-6 py-4 mb-6 font-titulo text-xl hover:bg-[#5ee7b2] w-[15vw]">
        Subir Partida
      </button>
      <HomeButton/>
    </div>
  )
}

export default MatchForm;