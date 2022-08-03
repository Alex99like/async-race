import { ICar } from '../../api/IApi';
import '../../styles/modal.css';

class ModalWinner {
  container: HTMLDivElement;

  state: { race: boolean; };

  title: HTMLHeadingElement;

  constructor() {
    this.container = document.createElement('div');
    this.state = { race: false };
    this.title = document.createElement('h1');
  }

  viewWinner(car: ICar, velocity: number) {
    if (this.state.race) {
      this.removeModal();
      this.container.className = 'modal-window';
      this.title.className = 'modal-winner-title';
      this.title.textContent = `${car.name} went first [${velocity}]!`;
      this.container.append(this.title);
    }
    this.state.race = false;
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
