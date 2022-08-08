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

  public get getNode(): {prev: HTMLButtonElement; next: HTMLButtonElement;} {
    return {
      prev: this.prev.node,
      next: this.next.node,
    };
  }

  public get getElement(): {prev: Button; next: Button;} {
    return {
      prev: this.prev,
      next: this.next,
    };
  }

  public render() {
    this.container.append(this.prev.node, this.next.node);
    return this.container;
  }
}

export default NextPrev;
