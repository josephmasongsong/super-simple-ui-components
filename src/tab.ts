export class Tab {
  private tabs: HTMLDivElement[];
  private panels: HTMLDivElement[];
  private tabContainer: HTMLDivElement | null;
  private panelContainer: HTMLDivElement | null;
  private selectedTab: HTMLDivElement | null;
  constructor() {
    this.tabContainer = document.querySelector('.tabs');
    this.tabs = Array.from(this.tabContainer!.querySelectorAll('div'));
    this.panelContainer = document.querySelector('.tabpanels');
    this.panels = Array.from(this.panelContainer!.querySelectorAll('div'));
    this.selectedTab = null;
  }
  init() {
    // * Apply ARIA attributes to tabs
    this.tabs.forEach((tab, index) => {
      tab.setAttribute('id', `tab-${index}`);
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
      tab.setAttribute('aria-controls', `panel-${index}`);
      tab.setAttribute('tabindex', index === 0 ? '0' : '-1');
    });

    // * Set selected tab
    this.selectedTab = document.querySelector('[aria-selected=true]');
    this.selectedTab!.focus();

    // * Apply ARIA attributes to panels
    this.panels.forEach((panel, index) => {
      panel.setAttribute('id', `panel-${index}`);
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('aria-labelledby', `tab-${index}`);
      panel.setAttribute('aria-expanded', index === 0 ? 'true' : 'false');
      panel.setAttribute('tabindex', index === 0 ? '0' : '-1');
      panel.style.display = index === 0 ? 'block' : 'none';
    });

    // * Add click event to tabs
    this.tabs.forEach(tab => {
      tab.addEventListener('click', e => {
        if (e.target instanceof HTMLDivElement) {
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
  toggleTabs(el: HTMLDivElement) {
    this.tabs.forEach(tab => {
      tab.setAttribute('aria-selected', 'false');
      tab.setAttribute('tabindex', '-1');
    });
    el.setAttribute('aria-selected', 'true');
    el.setAttribute('tabindex', '0');
  }
  togglePanels(el: HTMLDivElement) {
    this.panels.forEach(panel => {
      panel.setAttribute('aria-expanded', 'false');
      panel.setAttribute('tabindex', '-1');
      panel.style.display = 'none';
    });
    const id = el.getAttribute('aria-controls');
    const panel = this.panels.find(panel => panel.id === id);

    panel!.setAttribute('aria-expanded', 'true');
    panel!.setAttribute('tabindex', '0');
    panel!.style.display = 'block';
  }
  updateTab(tab: HTMLDivElement) {
    this.selectedTab!.setAttribute('aria-selected', 'true');
    this.selectedTab!.setAttribute('tabindex', '-1');
    tab.setAttribute('aria-selected', 'true');
    tab.setAttribute('tabindex', '0');
    this.selectedTab = tab;
    this.selectedTab.focus();
  }
}
