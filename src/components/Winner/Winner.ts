import { getCar } from '../../api/dbCar';
import { getAllWinners } from '../../api/dbWinner';
import { WinnerModel } from '../../api/IApi';
import '../../styles/winner.css';
import Button from '../Button/Button';
import renderCar from '../imgSvg/carSvg';
import SortButtons from './SortBtn';

class Winner {
  private container: HTMLDivElement;

  sort: 'ASC' | 'DESC';

  order: 'id' | 'wins' | 'time';

  page: number;

  pageWinners: HTMLDivElement;

  containerView: HTMLDivElement;

  listWinner: HTMLDivElement;

  prev: Button;

  next: Button;

  prevNext: HTMLDivElement;

  buttons: SortButtons;

  constructor() {
    this.container = document.createElement('div');
    this.pageWinners = document.createElement('div');
    this.containerView = document.createElement('div');
    this.listWinner = document.createElement('div');
    this.prevNext = document.createElement('div');
    this.sort = 'ASC';
    this.order = 'id';
    this.page = 1;
    this.prev = new Button('PREV', 'prev');
    this.next = new Button('NEXT', 'next');
    this.buttons = new SortButtons();
    this.prevNext.append(this.prev.node, this.next.node);
    this.classAdd();
  }

  classAdd() {
    this.container.className = 'winners-container';
    this.pageWinners.className = 'page-winners';
    this.containerView.className = 'view-container';
    this.listWinner.className = 'list-winner';
    this.prevNext.className = 'prev-next';
  }

  async createListWinner(arr: Promise<WinnerModel[]>) {
    const res = await arr;
    this.listWinner.innerHTML = '';
    res.forEach((item, index) => {
      this.createCarWinner(item, index);
    });
  }

  async createCarWinner(item: WinnerModel, index: number) {
    const container = document.createElement('div');
    const car = await getCar(item.id);
    container.innerHTML = `
      <h4 class='number'>${index + 1}</h4>
      <div class="car">${renderCar(car.color)}</div>
      <h4 class='name'>${car.name}</h4>
      <h4 class='wins'>${item.wins}</h4>
      <h4 class='time'>${item.time}</h4>
    `;
    container.className = 'winner-item';
    this.listWinner.append(container);
  }

  async viewWinners() {
    const res = await getAllWinners(this.page, this.order, this.sort);
    this.containerView.innerHTML = `<h3>Page: ${this.page}</h3>  <h3>Winners: ${res.totalCount}</h3>`;
    return res.result;
  }

  render() {
    this.createListWinner(this.viewWinners());
    this.pageWinners.append(
      this.containerView,
      this.buttons.render(),
      this.listWinner,
      this.prevNext,
    );
    this.container.append(this.pageWinners);
    return this.container;
  }
}

export default Winner;
