import {
  ICar, GarageData, IEngine, IWinner, IGetCar,
} from './IApi';

const base = 'http://localhost:3000';

const garage = `${base}/garage`;
const winners = `${base}/winners`;
const engine = `${base}/engine`;

const getCar = async (id: number): Promise<ICar> => (
  await fetch(`${garage}/${id}`)
).json();

const getCars = async (page: number, limit = 7): Promise<GarageData> => {
  const response = await fetch(`${garage}?_page=${page}&_limit=${limit}`);
  const items: ICar[] = await response.json();

  return {
    items: await Promise.all(items),
    count: response.headers.get('X-Total-Count'),
  };
};

const createCar = async (body: ICar): Promise<ICar> => { //
  const response = await fetch(`${garage}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const car: ICar = await response.json();
  return car;
};

const updateCar = async (id: number, body: IGetCar): Promise<ICar> => {
  const response = await fetch(`${garage}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const car: ICar = await response.json();
  return car;
};

const deleteCar = async (id: number): Promise<void> => {
  await fetch(`${garage}/${id}`, {
    method: 'DELETE',
  });
};

const statusEngine = async (id: number, status: 'started' | 'stopped'): Promise<IEngine> => (
  await fetch(`${engine}?id=${id}&status=${status}`, {
    method: 'PATCH',
  })
).json();

const driveState = async (id: number): Promise<Response> => {
  const response = await fetch(`${engine}?id=${id}&status=drive`, {
    method: 'PATCH',
  });
  return response;
};

const getWinner = async (id: number): Promise<IWinner> => (
  await fetch(`${winners}/${id}`)
).json();

const deleteWinner = async (id: number): Promise<void> => {
  const response = await fetch(`${winners}/${id}`, {
    method: 'DELETE',
  });

  const winner = await response.json();
  return winner;
};

export {
  getCar,
  getCars,
  createCar,
  deleteCar,
  statusEngine,
  driveState,
  updateCar,
  getWinner,
  deleteWinner,
};
