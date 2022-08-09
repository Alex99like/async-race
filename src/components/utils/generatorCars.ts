import { createCar } from '../../api/dbCar';

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color: string = '#';
  while (color.length < 7) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }
  return color;
};

const arrModel = ['Tesla', 'Audi', 'BMW', 'Ford', 'Hammer', 'Lexus', 'Cadillac', 'Chevrolet', 'Toyota', 'Mercedes'];
const arrModelTwo = ['AMG', 'Mali', 'S-One', 'Biasness', 'E-Six', 'S-class', 'E-I', 'Lab', 'I-8', 'Sub'];

const generatorCarsFn = async () => {
  let i: number = 0;
  while (i < 100) {
    const carName: string = `${arrModel[Math.floor(Math.random() * arrModel.length)]} ${arrModelTwo[Math.floor(Math.random() * arrModel.length)]}`;
    createCar({ name: carName, color: getRandomColor() });
    i += 1;
  }
};

export default generatorCarsFn;
