import { getAllCars } from '../api/apiJson';
import createCar from './createCar';
import { IInput } from './inputContainer';

const createListCar = async () => {
  const list = document.querySelector('.list-car');
  const arrEl = await getAllCars(1);
  if (list) {
    list.innerHTML = '';
    arrEl.forEach((el) => {
      list?.append(createCar(el));
    });
  }
};

export default createListCar;
