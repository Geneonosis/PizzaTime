import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './_pages/page-not-found/page-not-found.component';
import { HomeComponent } from './_pages/home/home.component';
import { OrderComponent } from './_pages/order/order.component';
import { authGuard } from './_guards/auth.guard';
import { ConfirmedComponent } from './_pages/confirmed/confirmed.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '404', component: PageNotFoundComponent },
  {
    path: 'placeOrder',
    component: OrderComponent,
    canActivate: [authGuard],
  },
  {
    path: 'confirmedOrders',
    component: ConfirmedComponent,
    canActivate: [authGuard],
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/404' },
];
