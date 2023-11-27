import { Link } from "react-router-dom";
import neon from  '../assets/Neon.svg';
import killjoy from "../assets/Killjoy.svg";

function HomePage(){
  return(
    <div className="w-full h-full grid place-content-center grid-flow-col col-span-3">

      <div>
        <div className="absolute bottom-0 left-0">
          <img src={killjoy} alt="Killjoy"/>
        </div>
      </div>

      <div>
        <h1 className="font-titulo text-6xl px-6 py-12 text-center">MENU</h1>
        <div className="grid grid-flow-row grid-cols-1 place-items-center text-center gap-4">
          <Link to={"/newMatch"}>
            <button
              className="bg-verde px-6 py-4 mb-6 font-titulo text-fondo text-2xl hover:bg-[#5ee7b2] w-[30vw]"
            >
              Ingresar Datos de Partida
            </button>
          </Link>
          <Link to={"/matchHistory"}>
            <button
              className="bg-verde px-6 py-4 mb-6 font-titulo text-fondo text-2xl hover:bg-[#5ee7b2] w-[30vw]"
            >
              Ver Datos Históricos
            </button>
          </Link>
          <Link to={"/predictrank"}>
            <button
              className="bg-verde px-6 py-4 mb-6 font-titulo text-fondo text-2xl hover:bg-[#5ee7b2] w-[30vw]"
            >
              Estimar Número de Pártidas
            </button>
          </Link>
          <Link to={"/currentRank"}>
            <button
              className="bg-verde px-6 py-4 mb-6 font-titulo text-fondo text-2xl hover:bg-[#5ee7b2] w-[30vw]"
            >
              Ingresar Rango Actual
            </button>
          </Link>
        </div>
      </div>

      <div>
        <div className="absolute bottom-0 right-0">
          <img src={neon} alt="Neon" />
        </div>
      </div>

    </div>
  );
}

export default HomePage;