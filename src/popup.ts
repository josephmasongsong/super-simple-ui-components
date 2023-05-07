import '../styles/popup.css';

type PopupOptions = {
  maxWidth: string;
  opacity: string;
};

export class Popup {
  private wrapper: HTMLElement;
  private popup: HTMLElement;
  constructor(private options: PopupOptions) {
    this.wrapper = document.getElementById('popup-wrapper')!;
    this.popup = document.getElementById('popup')!;
  }
  init() {
    // * Hide wrapper overlay
    this.wrapper.style.display = 'none';

    // * Set ARIA attributes on popup
    this.popup.setAttribute('role', 'dialog');
    this.popup.setAttribute('aria-modal', 'true');
    this.popup.setAttribute('aria-labelleby', 'modal-title');
    this.popup.setAttribute('aria-describedby', 'modal-description');
    this.popup.setAttribute('tabindex', '-1');

    // * Set popup width and wrapper opacity from options
    const { maxWidth = '600px', opacity = '0.85' } = this.options;

    this.popup.style.maxWidth = maxWidth;
    this.wrapper.style.backgroundColor = `rgba(0,0,0,${opacity}`;

    // * Hide the wrapper on wrapper click
    this.wrapper.addEventListener('click', () => {
      this.wrapper.style.display = 'none';
      this.popup.setAttribute('tabindex', '-1');
    });

    // * Stop wrapper click from propagating to popup
    this.popup.addEventListener('click', e => {
      e.stopPropagation();
    });
  }
  show() {
    this.wrapper.style.display = 'block';
    this.popup.setAttribute('tabindex', '0');
    return true;
  }
  hide() {
    this.wrapper.style.display = 'none';
    this.popup.setAttribute('tabindex', '-1');
    return true;
  }
}
