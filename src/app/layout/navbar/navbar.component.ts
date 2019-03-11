import { Component } from '@angular/core';

import { NavbarMenuItem } from './shared/models/navbar-menu-item.model';
import { NavBarMenuItems } from './shared/constants/navbar-menu-items';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  public menuItems: NavbarMenuItem[];

  constructor() {
    this.menuItems = NavBarMenuItems;
  }

  public trackBy(index: number, item: NavbarMenuItem): number {
    return item.id;
  }
}
