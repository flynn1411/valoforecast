import * as math from 'mathjs';
import * as jStat from 'jstat';
import MLR from "ml-regression-multivariate-linear";

/**
 * Calcula la media y la desviación estándar de varios conjuntos de datos.
 *
 * @param {Object} matchData - Datos históricos de las partidas ingresadas por el jugador.
 * @param {number[]} matchData.kill - Datos de kills.
 * @param {number[]} matchData.deaths - Datos de deaths.
 * @param {number[]} matchData.assists - Datos de assists.
 * @param {number[]} matchData.econ - Datos de puntaje de economia.
 * @param {number[]} matchData.firstBlood - Datos de firstBlood.
 * @param {number[]} matchData.spikes - Datos de spikes(plantaciones).
 * @param {number[]} matchData.defuses - Datos de defuses.
 * @returns {Object|null} Un objeto con las medias y desviaciones estándar de cada conjunto de datos.
 *                       Si alguno de los conjuntos de datos está vacío, devuelve null.
 */
function calculateMeanStandardDeviation(matchData: {
  kill: number[];
  deaths: number[];
  assists: number[];
  econ: number[];
  firstBlood: number[];
  spikes: number[];
  defuses: number[];
}): {
  killData: {
    killMean: number,
    killStandardDeviation: any
  };
  deathData: {
    deathMean: number,
    deathStandarDeviation: any
  };
  assistData: {
    assistMean: number,
    assistStandardDeviation: any
  };
  econData: {
    econMean: number,
    econStandardDeviation: any
  };
  firstBloodData: {
    firstBloodMean: number,
    firstBloodStandardDeviation: any
  };
  spikeData: {
    spikeMean: number,
    spikeStandardDeviation: any
  };
  defusesData: {
    defusesMean: number,
    defusesStandardDeviation: any
  };
} | null {
  if (
    matchData.kill.length === 0 ||
    matchData.deaths.length === 0 ||
    matchData.assists.length === 0 ||
    matchData.econ.length === 0 ||
    matchData.firstBlood.length === 0 ||
    matchData.spikes.length === 0 ||
    matchData.defuses.length === 0
  ) {
    return null;
  }

  const killMean = math.mean(matchData.kill);
  const killStandardDeviation = math.std(matchData.kill);

  const deathMean = math.mean(matchData.deaths);
  const deathStandarDeviation = math.std(matchData.deaths);

  const assistMean = math.mean(matchData.assists);
  const assistStandardDeviation = math.std(matchData.assists);

  const econMean = math.mean(matchData.econ);
  const econStandardDeviation = math.std(matchData.econ);

  const firstBloodMean = math.mean(matchData.firstBlood);
  const firstBloodStandardDeviation = math.std(matchData.firstBlood);

  const spikeMean = math.mean(matchData.spikes);
  const spikeStandardDeviation = math.std(matchData.spikes);

  const defusesMean = math.mean(matchData.defuses);
  const defusesStandardDeviation = math.std(matchData.defuses);

  return {
    killData: { killMean, killStandardDeviation },
    deathData: { deathMean, deathStandarDeviation },
    assistData: { assistMean, assistStandardDeviation },
    econData: { econMean, econStandardDeviation },
    firstBloodData: { firstBloodMean, firstBloodStandardDeviation },
    spikeData: { spikeMean, spikeStandardDeviation },
    defusesData: { defusesMean, defusesStandardDeviation }
  };
}
/**
 * Función que genera una matriz de datos aleatorios para ser usados en las predicciones del modelo.
 * Los datos que se ingresan en esta función son los datos generados por la función calculateMeanStandardDeviation.
 *
 * @param {Object} killData - Objeto que contiene las estadísticas de la categoría "kill".
 * @param {number} killData.killMean - Media de la categoría "kill".
 * @param {number} killData.killStandardDeviation - Desviación estándar de la categoría "kill".
 * @param {Object} deathData - Objeto que contiene las estadísticas de la categoría "deaths".
 * @param {number} deathData.deathMean - Media de la categoría "deaths".
 * @param {number} deathData.deathStandarDeviation - Desviación estándar de la categoría "deaths".
 * @param {Object} assistData - Objeto que contiene las estadísticas de la categoría "assists".
 * @param {number} assistData.assistMean - Media de la categoría "assists".
 * @param {number} assistData.assistStandardDeviation - Desviación estándar de la categoría "assists".
 * @param {Object} econData - Objeto que contiene las estadísticas de la categoría "econ".
 * @param {number} econData.econMean - Media de la categoría "econ".
 * @param {number} econData.econStandardDeviation - Desviación estándar de la categoría "econ".
 * @param {Object} firstBloodData - Objeto que contiene las estadísticas de la categoría "firstBlood".
 * @param {number} firstBloodData.firstBloodMean - Media de la categoría "firstBlood".
 * @param {number} firstBloodData.firstBloodStandardDeviation - Desviación estándar de la categoría "firstBlood".
 * @param {Object} spikeData - Objeto que contiene las estadísticas de la categoría "spikes"(plantaciones).
 * @param {number} spikeData.spikeMean - Media de la categoría "spikes"(plantaciones).
 * @param {number} spikeData.spikeStandardDeviation - Desviación estándar de la categoría "spikes"(plantaciones).
 * @param {Object} defusesData - Objeto que contiene las estadísticas de la categoría "defuses".
 * @param {number} defusesData.defusesMean - Media de la categoría "defuses".
 * @param {number} defusesData.defusesStandardDeviation - Desviación estándar de la categoría "defuses".
 * @param {number} rowNumber - Número de filas de datos aleatorios a generar.
 * @returns {number[][]} Matriz de datos aleatorios generados con los datos estadísticos proporcionados anteriormente.
 */
function generateRandomData(
  killData: { killMean: number; killStandardDeviation: number },
  deathData: { deathMean: number; deathStandarDeviation: number },
  assistData: { assistMean: number; assistStandardDeviation: number },
  econData: { econMean: number; econStandardDeviation: number },
  firstBloodData: { firstBloodMean: number; firstBloodStandardDeviation: number },
  spikeData: { spikeMean: number; spikeStandardDeviation: number },
  defusesData: { defusesMean: number; defusesStandardDeviation: number }, rowNumber: number
): number[][] {
  const generatedData: number[][] = [];

  for (let i = 0; i < rowNumber; i++) {
    const filaGenerada: number[] = [
      Math.abs(Math.round(jStat.normal.inv(Math.random(), killData.killMean, killData.killStandardDeviation))),
      Math.abs(Math.round(jStat.normal.inv(Math.random(), deathData.deathMean, deathData.deathStandarDeviation))),
      Math.abs(Math.round(jStat.normal.inv(Math.random(), assistData.assistMean, assistData.assistStandardDeviation))),
      Math.abs(Math.round(jStat.normal.inv(Math.random(), econData.econMean, econData.econStandardDeviation))),
      Math.abs(Math.round(jStat.normal.inv(Math.random(), firstBloodData.firstBloodMean, firstBloodData.firstBloodMean))),
      Math.abs(Math.round(jStat.normal.inv(Math.random(), spikeData.spikeMean, spikeData.spikeStandardDeviation))),
      Math.abs(Math.round(jStat.normal.inv(Math.random(), defusesData.defusesMean, defusesData.defusesStandardDeviation)))
    ];

    generatedData.push(filaGenerada);
  }

  return generatedData;
}

function transformInfo(info: any): any {
  const properties: string[] = ['kill', 'deaths', 'assists', 'econ', 'firstBlood', 'spikes', 'defuses'];

  const data: any = properties.reduce((acc: any, prop: string, index: number) => {
    acc[prop] = info.map((partida: any) => partida[index]);
    return acc;
  }, {});

  return data;
}
/**
 * Funcion de soprte para la función calculateMatches. Esta función recibe los puntos históricos proporcionados por el jugador,el rango actual, puntaje actual y rango al que desea llegar. Con esto se hacen una serie de calculos que se usan para estimar el numero de partidas a simular (usando los números aleatorios de la función generateRandomData). Posteriormente esta infomacion se usa para construir el modelo que estimará el desemepeño en esas partidas simuladas. 
 *
 * @param {any} originalInfo - Datos históricos de las partidas del jugador.
 * @param {number[][]} points - Puntaje histórico que se obtuvo en las partidas que se ingresan.
 * @param {number} actualRank - Rango actual.
 * @param {number} actualRankPoints - Puntaje actual en el rango.
 * @param {number} futureRank - Rango deseado.
 * @returns {any} Estimación de puntos por partida según los datos ingresados y los simulados.
 */

function calculatePoints(originalInfo: any, points: number[][], actualRank:number, actualRankPoints: number, futureRank:number): any {
  const data = transformInfo(originalInfo)
  const result = calculateMeanStandardDeviation(data);
  
  const totalMatches = points.length;
  const totalPoints = points.reduce((acc, row) => acc + row.reduce((accRow, punto) => accRow + punto, 0), 0);
  const meanPoints = totalMatches > 0 ? totalPoints / totalMatches : 0;
  let estimatedMatches: number = 0;

  const promotionPoints = futureRank - actualRank - actualRankPoints;

  if (actualRankPoints >= 85){
    estimatedMatches = meanPoints > 0 ? Math.ceil((promotionPoints / meanPoints)*2.50) : 0;
  }

  else{
    estimatedMatches = meanPoints > 0 ? Math.ceil((promotionPoints / meanPoints)*1.75) : 0;
  }
  console.log('partidas estimadas: ' + estimatedMatches)

  
  if (result?.killData) {
    const randomData = generateRandomData(result?.killData, result?.deathData, result?.assistData, result?.econData, result?.firstBloodData, result?.spikeData, result?.defusesData, estimatedMatches);
    
    // predicción

    return new MLR(originalInfo, points).predict(randomData);

  }

}

function calculateMatches(originalInfo: any, historicPoints: number[][], actualRank:number, actualRankPoints: number, futureRank:number){
  const predictedPoints = (calculatePoints(originalInfo, historicPoints, actualRank, actualRankPoints, futureRank));
  //const cleanPredictedPoints = removeOutliers(predictedPoints)

  const neededPoints:number = futureRank - actualRank - actualRankPoints ;
  let sumTotal:number = 0;
  let matches:number = 0;
  console.log('puntos antes:' +predictedPoints)
  //console.log('puntos despues:' + cleanPredictedPoints)

  for (let i in predictedPoints) {
    sumTotal += parseInt(predictedPoints[i])

    if (sumTotal>=neededPoints) {

      matches = parseInt(i)+1;
      break;
    }
  }

  
  console.log(predictedPoints);
  return matches;
}

export default calculateMatches;