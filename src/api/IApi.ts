interface ICar {
  name: string,
  color: string,
  id: number
}

interface IGetCar {
  name: string,
  color: string,
}

interface GarageData {
  items: ICar[];
  count: string | null;
}

interface IEngine {
  velocity: number;
  distance: number;
}

interface IWinner {
  id: number;
  wins: number;
  time: number;
}

interface WinnerModel {
  id: number;
  wins: number;
  time: number;
}

interface WinnersModel {
  items: WinnerModel[];
  count: string | null;
}

export {
  ICar, GarageData, IEngine, IWinner, IGetCar, WinnerModel, WinnersModel,
};
