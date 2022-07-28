import { createCarApi } from '../api/apiJson';
import createListCar from './createListCar';

const createBtnCar = async (name: HTMLInputElement, color: HTMLInputElement) => {
  await createCarApi({ name: name.value, color: color.value });
  // await createListCar();
};

export default createBtnCar;
