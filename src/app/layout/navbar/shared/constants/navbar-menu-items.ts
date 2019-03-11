import { AppRoutePages } from 'src/app/shared/constants/app-route-pages.enum';
import { NavbarMenuItem } from '../models/navbar-menu-item.model';

export const NavBarMenuItems: NavbarMenuItem[] = [
  {
    iconClasses: 'plus circle',
    id: 0,
    path: AppRoutePages.AddContact,
    text: 'Agregar contacto'
  },
  {
    iconClasses: 'address book',
    id: 1,
    path: AppRoutePages.Contacts,
    text: 'Contactos'
  }
];
