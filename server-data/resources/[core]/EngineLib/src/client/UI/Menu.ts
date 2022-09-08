export type MenuElement = {
  label: string;
  value: string;
}

export class Menu {
  name: string;
  title: string;
  position: 'tl' | 'tc' | 'tr' | 'cl' | 'cc' | 'cr' | 'bl' | 'bc' | 'br';
  elements: MenuElement[];

  onClick: {(cmd: string): void};
  onBack: {(): void};
  onChange: {(cmd: string): void}

  constructor(obj?: Partial<Menu>) {
    if (obj) Object.assign(this, obj);
  }

  show(): Menu {
    TriggerEvent('nova-ui:menu_show', this.name, {
      name: this.name,
      title: this.title,
      position: this.position,
      elements: this.elements
    }, { 
      click: this.onClick,
      back: this.onBack,
      change: this.onChange,
    })
  
    return this;
  }

  hide(): Menu {
    TriggerEvent('nova-ui:menu_hide');

    return this;
  }

  static hideAll(): void {
    TriggerEvent('nova-ui:menu_hide');
  }
}