import { createWinner, getAllWinners, updateWinner } from '../../api/dbWinner';
import { ICar } from '../../api/IApi';
import '../../styles/modal.css';

class ModalWinner {
  container: HTMLDivElement;

  state: { race: boolean; };

  title: HTMLHeadingElement;

  allWinners: Array<number>;

  constructor() {
    this.container = document.createElement('div');
    this.state = { race: false };
    this.title = document.createElement('h1');
    this.allWinners = [];
  }

  async viewWinner(car: ICar, velocity: number) {
    if (this.state.race) {
      const speed = velocity / 10;
      this.removeModal();
      this.container.className = 'modal-window';
      this.title.className = 'modal-winner-title';
      this.title.textContent = `${car.name} went first [${speed}s]!`;
      this.container.append(this.title);
      await this.getWinners();
      if (this.allWinners.includes(car.id)) {
        await updateWinner({
          id: car.id,
          time: speed,
          wins: 2,
        });
      } else {
        await createWinner({
          id: car.id,
          time: velocity,
          wins: 1,
        });
      }
    }
    this.state.race = false;
  }

  async getWinners() {
    const arr = await getAllWinners(1, 'id', 'ASC', 150);
    this.allWinners = arr.result.map((el) => el.id);
  }

  removeModal() {
    this.container.addEventListener('click', () => {
      this.container.className = '';
      this.container.innerHTML = '';
    });
  }

  set setState(value: boolean) {
    this.state.race = value;
  }

  render() {
    return this.container;
  }
}

export default ModalWinner;
