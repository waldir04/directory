import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppRoutePages } from '../shared/constants/app-route-pages.enum';

const routes: Routes = [
  {
    path: AppRoutePages.AddContact,
    loadChildren: '../pages/add-contact/add-contact.module#AddContactModule'
  },
  {
    path: AppRoutePages.Contacts,
    loadChildren: '../pages/contacts/contacts.module#ContactsModule'
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: AppRoutePages.AddContact
  },
  {
    path: '**',
    redirectTo: AppRoutePages.AddContact
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingRoutingModule {}
