import { async, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { NavbarMenuItem } from './shared/models/navbar-menu-item.model';
import { RouterTestingModule } from '@angular/router/testing';

describe('NavbarComponent', () => {
  let component: NavbarComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [NavbarComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    component = new NavbarComponent();
  });

  describe('trackBy()', () => {
    it('should return the menu item identifier', () => {
      const menuItem = { id: 2 } as NavbarMenuItem;
      expect(component.trackBy(null, menuItem)).toEqual(menuItem.id);
    });
  });

});
