export class Accordion {
  private tabs: HTMLButtonElement[];
  private panels: HTMLDivElement[];
  private selectedTab: HTMLButtonElement | null;
  constructor() {
    this.tabs = Array.from(document.querySelectorAll('.tab'));
    this.panels = Array.from(document.querySelectorAll('.tabpanel'));
    this.selectedTab = null;
  }
  init() {
    // * Apply ARIA attributes to tabs
    this.tabs.forEach((tab, index) => {
      tab.setAttribute('id', `tab-${index}`);
      tab.setAttribute('role', 'tab');
      tab.setAttribute('tabindex', index === 0 ? '0' : '-1');
      tab.setAttribute('aria-controls', `panel-${index}`);
      tab.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
    });

    // * Set selected tab
    this.selectedTab = document.querySelector('[aria-selected=true]');
    this.selectedTab!.focus();

    // * Apply ARIA attributes to panels
    this.panels.forEach((panel, index) => {
      panel.setAttribute('id', `panel-${index}`);
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('aria-labelledby', `tab-${index}`);
      panel.setAttribute('aria-hidden', index === 0 ? 'false' : 'true');
      panel.style.display = index === 0 ? 'block' : 'none';
    });

    // * Add click event to tabs
    this.tabs.forEach(tab => {
      tab.addEventListener('click', e => {
        if (e.target instanceof HTMLButtonElement) {
          this.toggleTabs(e.target);
          this.togglePanels(e.target);
        }
      });
    });

    // * Apply keydown event to tabs
    this.tabs.forEach(tab => {
      tab.addEventListener('keydown', e => {
        const currIndex = this.tabs.indexOf(this.selectedTab!);

        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();

          const prevTab = this.tabs[currIndex - 1] || this.tabs[this.tabs.length - 1];
          this.updateTab(prevTab);
          this.togglePanels(prevTab);
        } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();

          const nextTab = this.tabs[currIndex + 1] || this.tabs[0];
          this.updateTab(nextTab);
          this.togglePanels(nextTab);
        }
      });
    });
  }
  toggleTabs(el: HTMLButtonElement) {
    this.tabs.forEach(tab => {
      tab.setAttribute('aria-selected', 'false');
      tab.setAttribute('tabindex', '-1');
    });
    el.setAttribute('aria-selected', 'true');
    el.setAttribute('tabindex', '0');
  }
  togglePanels(el: HTMLButtonElement) {
    this.panels.forEach(panel => {
      panel.setAttribute('aria-hidden', 'true');
      panel.setAttribute('tabindex', '-1');
      panel.style.display = 'none';
    });

    const id = el.getAttribute('aria-controls');
    const panel = this.panels.find(panel => panel.id === id);

    panel!.setAttribute('aria-hidden', 'false');
    panel!.setAttribute('tabindex', '0');
    panel!.style.display = 'block';
  }
  updateTab(tab: HTMLButtonElement) {
    this.selectedTab!.setAttribute('aria-selected', 'false');
    this.selectedTab!.setAttribute('tabindex', '-1');
    tab.setAttribute('aria-selected', 'true');
    tab.setAttribute('tabindex', '0');
    this.selectedTab = tab;
    this.selectedTab.focus();
  }
}
