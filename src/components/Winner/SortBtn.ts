import Button from '../Button/Button';
import arrowRender from '../imgSvg/arrow';

class SortButtons {
  private number: HTMLHeadingElement;

  private car: HTMLHeadingElement;

  private name: HTMLHeadingElement;

  private wins: Button;

  private time: Button;

  private container: HTMLDivElement;

  constructor() {
    this.container = document.createElement('div');
    this.number = document.createElement('h5');
    this.car = document.createElement('h5');
    this.name = document.createElement('h5');
    this.wins = new Button('WINS', 'wins');
    this.time = new Button('Best Time (sec)', 'time');
    this.addAttributes();
  }

  private addAttributes() {
    this.container.className = 'container-btn';
    this.number.textContent = 'NUMBER';
    this.number.className = 'number';
    this.car.textContent = 'CAR';
    this.car.className = 'car';
    this.name.textContent = 'NAME';
    this.name.className = 'name';
    this.time.node.innerHTML += `<div class="arrow"> ${arrowRender()}</div>`;
    this.wins.node.innerHTML += `<div class="arrow"> ${arrowRender()}</div>`;
  }

  get getNode() {
    return {
      wins: this.wins.node,
      time: this.time.node,
    };
  }

  public render() {
    this.container.append(this.number, this.car, this.name, this.wins.node, this.time.node);
    return this.container;
  }
}

export default SortButtons;
