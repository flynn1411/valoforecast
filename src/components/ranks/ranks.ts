import Rango from "../../interfaces/Rank";
import iron1 from "../../assets/ranks/iron1.webp"
import iron2 from "../../assets/ranks/iron2.webp"
import iron3 from "../../assets/ranks/iron3.webp"
import bronze1 from "../../assets/ranks/bronze1.webp"
import bronze2 from "../../assets/ranks/bronze2.webp"
import bronze3 from "../../assets/ranks/bronze3.webp"
import silver1 from "../../assets/ranks/silver1.webp"
import silver2 from "../../assets/ranks/silver2.webp"
import silver3 from "../../assets/ranks/silver3.webp"
import gold1 from "../../assets/ranks/gold1.webp"
import gold2 from "../../assets/ranks/gold2.webp"
import gold3 from "../../assets/ranks/gold3.webp"
import plat1 from "../../assets/ranks/platinum1.webp"
import plat2 from "../../assets/ranks/platinum2.webp"
import plat3 from "../../assets/ranks/platinum3.webp"
import diamond1 from "../../assets/ranks/diamond1.webp"
import diamond2 from "../../assets/ranks/diamond2.webp"
import diamond3 from "../../assets/ranks/diamond3.webp"
import asc1 from "../../assets/ranks/ascendant1.webp"
import asc2 from "../../assets/ranks/ascendant2.webp"
import asc3 from "../../assets/ranks/ascendant3.webp"
import inmortal1 from "../../assets/ranks/inmortal1.webp"
import inmortal2 from "../../assets/ranks/inmortal2.webp"
import inmortal3 from "../../assets/ranks/inmortal3.webp"
import radiant from "../../assets/ranks/radiant.webp"


const ranks: Array<Rango[]> = [
  [
    {name: "Hierro 1", MMR: 100, img: iron1, color: "hierro" },
    {name: "Hierro 2", MMR: 200, img: iron2, color: "hierro" },
    {name: "Hierro 3", MMR: 300, img: iron3, color: "hierro" }
  ],
  [
    {name: "Bronce 1", MMR: 400, img: bronze1, color: "bronce" },
    {name: "Bronce 2", MMR: 500, img: bronze2, color: "bronce" },
    {name: "Bronce 3", MMR: 600, img: bronze3, color: "bronce" }
  ],
  [
    {name: "Plata 1", MMR: 700, img: silver1, color: "plata" },
    {name: "Plata 2", MMR: 800, img: silver2, color: "plata" },
    {name: "Plata 3", MMR: 900, img: silver3, color: "plata" }
  ],
  [
    {name: "Oro 1", MMR: 1000, img: gold1, color: "oro" },
    {name: "Oro 2", MMR: 1100, img: gold2, color: "oro" },
    {name: "Oro 3", MMR: 1200, img: gold3, color: "oro" }
  ],
  [
    {name: "Platino 1", MMR: 1300, img: plat1, color: "platino" },
    {name: "Platino 2", MMR: 1400, img: plat2, color: "platino" },
    {name: "Platino 3", MMR: 1500, img: plat3, color: "platino" }
  ],
  [
    {name: "Diamante 1", MMR: 1600, img: diamond1, color: "diamante" },
    {name: "Diamante 2", MMR: 1700, img: diamond2, color: "diamante" },
    {name: "Diamante 3", MMR: 1800, img: diamond3, color: "diamante" }
  ],
  [
    {name: "Ascendente 1", MMR: 1900, img: asc1, color: "ascendente" },
    {name: "Ascendente 2", MMR: 2000, img: asc2, color: "ascendente" },
    {name: "Ascendente 3", MMR: 2100, img: asc3, color: "ascendente" }
  ],
  [
    {name: "Inmortal 1", MMR: 2200, img: inmortal1, color: "inmortal" },
    {name: "Inmortal 2", MMR: 2300, img: inmortal2, color: "inmortal" },
    {name: "Inmortal 3", MMR: 2400, img: inmortal3, color: "inmortal" }
  ],
  [
    {name: "Radiante", MMR: 2500, img: radiant, color: "radiante" }
  ]
]

export default ranks;