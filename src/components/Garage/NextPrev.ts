import Button from '../Button/Button';

class NextPrev {
  private prev: Button;

  private next: Button;

  private container: HTMLDivElement;

  constructor() {
    this.container = document.createElement('div');
    this.container.className = 'prev-and-next';
    this.prev = new Button('PREV', 'prev');
    this.next = new Button('NEXT', 'next');
  }

  get getNode() {
    return {
      prev: this.prev.node,
      next: this.next.node,
    };
  }

  get getElement() {
    return {
      prev: this.prev.node,
      next: this.next.node,
    };
  }

  render() {
    this.container.append(this.prev.node, this.next.node);
    return this.container;
  }
}

export default NextPrev;
