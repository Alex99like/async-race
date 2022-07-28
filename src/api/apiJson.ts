const baseUrl = 'http://127.0.0.1:3000';
interface ICar {name: string, color: string, id?: number}
interface IEngine {distance: number, velocity: number}

const getCar = async <T extends ICar>(id: number): Promise<T> => {
  const response = await fetch(`${baseUrl}/garage/${id}`);
  return response.json();
};

const getAllCars = async (page: number, limit: number = 7): Promise<ICar[]> => {
  const response = await fetch(`${baseUrl}/garage?_page=${page}&_limit=${limit}`);
  return response.json();
};

const deleteCar = async (id: number) => {
  try {
    await fetch(`${baseUrl}/garage/${id}`, {
      method: 'DELETE',
    });
  } catch (e) {
    throw new Error(`${e}Нет машины`);
  }
};

const createCarApi = async (car: ICar) => {
  await fetch(`${baseUrl}/garage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(car),
  });
};

const updateCar = async (id: number, car: ICar) => {
  await fetch(`${baseUrl}/garage/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(car),
  });
};

const startEngine = async <T extends IEngine>(id: number, status: 'started' | 'stopped' | 'drive'): Promise<T> => {
  const response = await fetch(`${baseUrl}/engine?id=${id}&status=${status}`, {
    method: 'PATCH',
  });
  return response.json();
};

const checkDrive = async (id: number): Promise<Response> => {
  const response = await fetch(`${baseUrl}/engine?id=${id}&status=drive`, {
    method: 'PATCH',
  });
  return response;
};

export {
  getCar, deleteCar, getAllCars, createCarApi, updateCar, startEngine, ICar, checkDrive,
};
