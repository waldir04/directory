import { AppRoutePages } from 'src/app/shared/constants/app-route-pages.enum';

export interface NavbarMenuItem {
  iconClasses?: string;
  id: number;
  path: AppRoutePages;
  text: string;
}
