import Button from '../Button/Button';

class SortButtons {
  number: HTMLHeadingElement;

  car: HTMLHeadingElement;

  name: HTMLHeadingElement;

  wins: Button;

  time: Button;

  container: HTMLDivElement;

  constructor() {
    this.container = document.createElement('div');
    this.number = document.createElement('h5');
    this.car = document.createElement('h5');
    this.name = document.createElement('h5');
    this.wins = new Button('WINS', 'wins');
    this.time = new Button('Best Time (seconds)', 'time');
    this.addAttributes();
  }

  addAttributes() {
    this.container.className = 'container-btn';
    this.number.textContent = 'NUMBER';
    this.number.className = 'number';
    this.car.textContent = 'CAR';
    this.car.className = 'car';
    this.name.textContent = 'NAME';
    this.name.className = 'name';
  }

  render() {
    this.container.append(this.number, this.car, this.name, this.wins.node, this.time.node);
    return this.container;
  }
}

export default SortButtons;
