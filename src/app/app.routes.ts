import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { ProductListComponent } from './products/product-list/product-list.component';

export const routes: Routes = [
  { path: 'products', component: ProductListComponent},
  { path: 'welcome', component: HomeComponent},
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];
