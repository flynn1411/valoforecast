import HomeButton from "../HomeButton";
import calculatePoints from "./logica";

function RankPrediction(){
  // Ejemplo de uso
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
  ];

  //puntos actuales (RR)
  const actualRankPoints = 48;

  // Rango acutal 
  const actualRank = 100;

  // rango deseado
  const futureRank = 200;
  
  console.log('Predicciones de Puntos para Nuevas Partidas => ', calculatePoints(info, points,actualRank,actualRankPoints,futureRank));

  return(
    <div>
      Rank Prediction
      <HomeButton/>
    </div>
  )
}

export default RankPrediction;