import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CheckoutComponent } from './checkout/checkout.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'checkout', component: CheckoutComponent },
];
