import * as math from 'mathjs';
import * as jStat from 'jstat';
import MLR from "ml-regression-multivariate-linear";


function calculateMeanStandarDeviation(matchData: {
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

  //const rowNumber = Object.keys();
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

function calculatePoints(originalInfo: any, points: number[][], actualRank:number, actualRankPoints: number, futureRank:number): any {
  const data = transformInfo(originalInfo)
  const result = calculateMeanStandarDeviation(data);
  
  const totalMatches = points.length;
  const totalPoints = points.reduce((acc, row) => acc + row.reduce((accRow, punto) => accRow + punto, 0), 0);
  const meanPoints = totalMatches > 0 ? totalPoints / totalMatches : 0;
  
  // console.log(totalPoints)

  const promotionPoints = futureRank - actualRank - actualRankPoints;

  const estimatedMatches = meanPoints > 0 ? Math.ceil((promotionPoints / meanPoints)*1.50) : 0;
  
  if (result?.killData) {
    const randomData = generateRandomData(result?.killData, result?.deathData, result?.assistData, result?.econData, result?.firstBloodData, result?.spikeData, result?.defusesData, estimatedMatches);
    
    // predicción

    return new MLR(originalInfo, points).predict(randomData);

  }

}


function calculateMatches(originalInfo: any, historicPoints: number[][], actualRank:number, actualRankPoints: number, futureRank:number){
  const predictedPoints = (calculatePoints(originalInfo, historicPoints, actualRank, actualRankPoints, futureRank));

  const neededPoints:number = futureRank - actualRank - actualRankPoints ;
  let sumTotal:number = 0;
  let matches:number = 0;
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