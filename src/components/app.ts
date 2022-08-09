import Button from './Button/Button';
import Garage from './Garage/Garage';
import '../styles/global.css';
import Winner from './Winner/Winner';

class App {
  private garage: Garage;

  private page: HTMLDivElement;

  private containerBtn: HTMLDivElement;

  private garageBtn: Button;

  private winnerBtn: Button;

  private main: HTMLElement;

  private winner: Winner;

  constructor() {
    this.page = document.createElement('div');
    this.containerBtn = document.createElement('div');
    this.main = document.createElement('main');
    this.garageBtn = new Button('GARAGE', 'btn-functional');
    this.winnerBtn = new Button('WINNER', 'btn-functional');
    this.garage = new Garage();
    this.winner = new Winner();
  }

  private createGarage(): void {
    this.main.innerHTML = '';
    this.main.append(this.garage.render());
    this.garageBtn.node.classList.add('active');
    this.winnerBtn.node.classList.remove('active');
  }

  private createWinner(): void {
    this.main.innerHTML = '';
    this.main.append(this.winner.render());
    this.winnerBtn.node.classList.add('active');
    this.garageBtn.node.classList.remove('active');
  }

  addActiveBtn(): void {
    this.garageBtn.node.addEventListener('click', () => this.createGarage());
    this.winnerBtn.node.addEventListener('click', () => this.createWinner());
  }

  render(): void {
    this.containerBtn.className = 'container-function-btn';
    this.page.className = 'page';
    this.addActiveBtn();
    this.createGarage();
    this.containerBtn.append(this.garageBtn.node, this.winnerBtn.node);
    this.page.append(this.containerBtn, this.main);
    document.body.append(this.page);
  }
}

export default App;
