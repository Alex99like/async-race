import { getCars } from '../../api/dbCar';
import { getAllWinners } from '../../api/dbWinner';
import { GarageData, ICar, WinnerModel } from '../../api/IApi';
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
    this.addActiveBtn();
  }

  classAdd() {
    this.container.className = 'winners-container';
    this.pageWinners.className = 'page-winners';
    this.containerView.className = 'view-container';
    this.listWinner.className = 'list-winner';
    this.prevNext.className = 'prev-next';
  }

  async createListWinner() {
    const arrCar: ICar[] = [];
    const res: {
      result: WinnerModel[];
      totalCount: string;
  } = await getAllWinners(this.page, this.order, this.sort);
    const allCars: GarageData = await getCars(1, 1000000);
    if (res && allCars) {
      res.result.forEach((s) => {
        const car = allCars.items.find((el) => el.id === s.id);
        if (car) arrCar.push(car);
      });
    }
    this.checkNextPrev(+res.totalCount);
    this.containerView.innerHTML = `<h3>Page: ${this.page}</h3>  <h3>Winners: ${res.totalCount}</h3>`;
    this.listWinner.innerHTML = '';
    res.result.forEach((item, index) => {
      this.createCarWinner(item, index, arrCar[index]);
    });
  }

  nextPrev(value: 'next' | 'prev') {
    if (value === 'next') this.page += 1;
    if (value === 'prev') this.page -= 1;
    this.createListWinner();
  }

  addActiveBtn() {
    this.next.node.addEventListener('click', () => this.nextPrev('next'));
    this.prev.node.addEventListener('click', () => this.nextPrev('prev'));
    this.buttons.getNode.wins.addEventListener('click', () => {
      this.order = 'wins';
      this.buttons.getNode.time.classList.remove('ASC', 'DESC');
      if (this.buttons.getNode.wins.className.includes('ASC')) {
        this.sort = 'DESC';
        this.buttons.getNode.wins.classList.add('DESC');
        this.buttons.getNode.wins.classList.remove('ASC');
        this.createListWinner();
      } else {
        this.sort = 'ASC';
        this.buttons.getNode.wins.classList.add('ASC');
        this.buttons.getNode.wins.classList.remove('DESC');
        this.createListWinner();
      }
    });
    this.buttons.getNode.time.addEventListener('click', () => {
      this.order = 'time';
      this.buttons.getNode.wins.classList.remove('ASC', 'DESC');
      if (this.buttons.getNode.time.className.includes('ASC')) {
        this.sort = 'DESC';
        this.buttons.getNode.time.classList.add('DESC');
        this.buttons.getNode.time.classList.remove('ASC');
        this.createListWinner();
      } else {
        this.sort = 'ASC';
        this.buttons.getNode.time.classList.add('ASC');
        this.buttons.getNode.time.classList.remove('DESC');
        this.createListWinner();
      }
    });
  }

  checkNextPrev(count: number) {
    if (this.page <= 1) this.prev.disabled();
    else this.prev.enabled();
    if (count / 10 <= this.page) this.next.disabled();
    else this.next.enabled();
  }

  async createCarWinner(item: WinnerModel, index: number, car: ICar) {
    const container: HTMLDivElement = document.createElement('div');
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

  render() {
    this.createListWinner();
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
