import '../styles/tooltip.css';

type Pos = 'right' | 'left' | 'top' | 'bottom';

class Tooltip {
  private element: Element;
  private position: Pos;
  private message: string | null;
  constructor(element: string, pos: Pos = 'right') {
    this.element = document.querySelector(element)!;
    this.message = this.element.getAttribute('data-message');
    this.position = pos;
  }
  // * Initiate the tooltip
  init() {
    const tip = document.createElement('div');

    // * Set ARIA attributes on tooltip
    tip.setAttribute('role', 'tooltip');
    tip.setAttribute('aria-hidden', 'true');

    // * Add tooltip position via CSS class
    tip.classList.add('tip', this.position);

    // * Set the tooltip content
    tip.textContent = this.message;

    this.element.appendChild(tip);

    this.element.addEventListener('mouseenter', () => {
      tip.classList.add('active');
    });
    this.element.addEventListener('mouseleave', () => {
      tip.classList.remove('active');
    });
  }
}

export { Tooltip };
