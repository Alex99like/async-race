import Button from './Button';
import Input from './Input';

class InputContainer {
  private name: Input;

  private button: Button;

  private color: Input;

  private container: HTMLDivElement;

  getId: number;

  element: { name: undefined | HTMLDivElement; color: undefined | HTMLDivElement; };

  constructor(textBtn: string) {
    this.container = document.createElement('div');
    this.container.className = 'input-container';
    this.name = new Input('text');
    this.color = new Input('color');
    this.button = new Button(textBtn);
    this.element = { name: undefined, color: undefined };
    this.getId = 0;
  }

  disabled() {
    this.name.node.value = '';
    this.color.node.value = '#953418';
    this.name.disabled();
    this.color.disabled();
    this.button.disabled();
  }

  enabled() {
    this.name.enabled();
    this.color.enabled();
    this.button.enabled();
  }

  get allInputs() {
    return {
      name: this.name.node,
      color: this.color.node,
      button: this.button.node,
      element: this.element,
    };
  }

  render() {
    this.container.append(this.name.node, this.color.node, this.button.node);
    return this.container;
  }
}

export default InputContainer;
