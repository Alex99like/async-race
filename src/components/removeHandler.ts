import { deleteCar } from '../api/apiJson';
import createListCar from './createListCar';
import { IInput } from './inputContainer';

const removeHandler = async (car: HTMLDivElement, input: IInput) => {
  if (car.dataset.id) {
    await deleteCar(+car.dataset.id);
  }
  await createListCar(input);
};

export default removeHandler;
