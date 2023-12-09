interface Prediction{
  matches:number,
  predictedPoints: {
    [key: string]: number;
  }[]
}

export default Prediction;