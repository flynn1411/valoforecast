import { Link } from "react-router-dom";

function HomeButton(){
  return(
    <Link to={"/"}>
      <button className="bg-rojo text-fondo px-6 py-4 mb-6 font-titulo text-xl hover:bg-[#ff7984] w-[15vw] absolute bottom-4 right-4">
        Volver al Menú Principal
      </button>
    </Link>
  )
}

export default HomeButton;