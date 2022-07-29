import { createCarApi } from '../api/apiJson';
import createListCar from './createListCar';
import { IInput } from './inputContainer';

const createBtnCar = async (name: HTMLInputElement, color: HTMLInputElement, input: IInput) => {
  const [nameInput, colorInput] = [name, color];
  await createCarApi({ name: name.value, color: color.value });
  nameInput.value = '';
  colorInput.value = '';
  await createListCar(input);
};

export default createBtnCar;
