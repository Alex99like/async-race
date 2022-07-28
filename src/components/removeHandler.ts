import { deleteCar } from '../api/apiJson';
import createListCar from './createListCar';

const removeHandler = async (car: HTMLDivElement) => {
  if (car.dataset.id) {
    await deleteCar(+car.dataset.id);
  }
  // await createListCar();
};

export default removeHandler;
