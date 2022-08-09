import { WinnerModel } from './IApi';

const base = 'http://localhost:3000';
const winners = `${base}/winners`;

const getAllWinners = async (
  page: number,
  sort: 'id' | 'wins' | 'time' = 'time',
  order: 'ASC' | 'DESC' = 'ASC',
  limit = 10,
): Promise<{ result: Array<WinnerModel>; totalCount: string }> => {
  const data = await fetch(
    `${winners}/?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`,
  );
  const res: Array<WinnerModel> = await data.json();

  return {
    result: res,
    totalCount: data.headers.get('X-Total-Count') || '0',
  };
};

const getWinner = async (
  winnerId: number,
): Promise<WinnerModel> => {
  const data = await fetch(`${winners}/${winnerId}`);
  const res: WinnerModel = await data.json();

  return res;
};

const createWinner = async (carData: WinnerModel): Promise<void> => {
  await fetch(`${winners}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(carData),
  });
};

const updateWinner = async (carData: WinnerModel): Promise<void> => {
  await fetch(`${winners}/${carData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(carData),
  });
};

const deleteWinner = async (carId: number): Promise<void> => {
  await fetch(`${winners}/${carId}`, {
    method: 'DELETE',
  });
};

export {
  getWinner, createWinner, updateWinner, getAllWinners, deleteWinner,
};
