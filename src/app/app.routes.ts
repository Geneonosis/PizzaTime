import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { OrderComponent } from './order/order.component';
import { AuthenticateService } from './authenticate.service';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '404', component: PageNotFoundComponent },
  {
    path: 'placeOrder',
    component: OrderComponent,
    canActivate: [authGuard],
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/404' },
];
