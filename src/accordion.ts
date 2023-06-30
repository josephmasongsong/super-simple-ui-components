import '../styles/accordion.css';

class Accordion {
  tabs: HTMLDivElement[];
  panels: HTMLDivElement[];
  selectedTab: HTMLDivElement | null;
  container: HTMLDivElement;
  constructor(public id: string) {
    this.container = document.querySelector(id)!;
    this.tabs = [...this.container.querySelectorAll<HTMLDivElement>('.tab')];
    this.panels = [...this.container.querySelectorAll<HTMLDivElement>('.panel')];
    this.selectedTab = null;
  }
  // * Initiate the accordion
  init() {
    this.container.setAttribute('role', 'tablist');

    this.tabs.forEach((tab, index) => {
      tab.setAttribute('id', `tab-${index}`);
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-controls', `panel-${index}`);
      tab.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
      tab.setAttribute('tabindex', index === 0 ? '0' : '-1');
    });

    this.selectedTab = document.querySelector('[aria-selected=true]');
    if (this.selectedTab != null) this.selectedTab.focus();

    this.panels.forEach((panel, index) => {
      panel.setAttribute('id', `panel-${index}`);
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('aria-labelledby', `tab-${index}`);
      panel.setAttribute('aria-expanded', index === 0 ? 'false' : 'true');
      panel.style.display = index === 0 ? 'block' : 'none';
    });

    this.tabs.forEach(tab => {
      tab.addEventListener('click', e => {
        if (e.target instanceof HTMLDivElement) {
          this.toggleTabs(e.target);
          this.togglePanels(e.target);
        }
      });
    });

    this.tabs.forEach(tab => {
      tab.addEventListener('keydown', e => {
        const currIndex = this.tabs.indexOf(this.selectedTab!);

        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          const prevTab = this.tabs[currIndex - 1] || this.tabs[this.tabs.length - 1];

          this.updateTab(prevTab);
          this.togglePanels(prevTab);
        } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          const nextTab = this.tabs[currIndex + 1] || this.tabs[0];

          this.updateTab(nextTab);
          this.togglePanels(nextTab);
        }
      });
    });
  }
  // * Reset ARIA attributes on inactive tabs and set ARIA on active tab
  toggleTabs(el: HTMLDivElement) {
    this.tabs.forEach(tab => {
      tab.setAttribute('aria-selected', 'false');
      tab.setAttribute('tabindex', '-1');
    });
    el.setAttribute('aria-selected', 'true');
    el.setAttribute('tabindex', '0');
  }
  // * Reset ARIA attributes on inactive panels and set ARIA on active panels
  togglePanels(el: HTMLDivElement) {
    this.panels.forEach(panel => {
      panel.setAttribute('aria-expanded', 'true');
      panel.setAttribute('tabindex', '-1');
      panel.style.display = 'none';
    });

    const id = el.getAttribute('aria-controls');
    const panel = this.panels.find(panel => panel.id === id);

    if (panel != null) {
      panel.setAttribute('aria-expanded', 'false');
      panel.setAttribute('tabindex', '0');
      panel.style.display = 'block';
    }
  }
  // * Reset ARIA for previously inactive tab and set for new tab
  updateTab(tab: HTMLDivElement) {
    this.selectedTab!.setAttribute('aria-selected', 'false');
    this.selectedTab!.setAttribute('tabindex', '-1');
    tab.setAttribute('aria-selected', 'true');
    tab.setAttribute('tabindex', '0');
    this.selectedTab = tab;
    this.selectedTab.focus();
  }
}

export { Accordion };
