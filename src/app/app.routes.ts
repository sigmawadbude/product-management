import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { productResolver } from './services/product.resolver';
import { LoginComponent } from './user/login.component';
import { ProductEditComponent } from './products/product-edit/product-edit.component';
import { ProductEditInfoComponent } from './products/product-edit/product-edit-info.component';
import { ProductEditTagsComponent } from './products/product-edit/product-edit-tags.component';
import { MessagesComponent } from './messages/messages.component';

export const routes: Routes = [
  {
    path: 'products',
    children: [
      { path: '', component: ProductListComponent },
      {
        path: ':id',
        component: ProductDetailComponent,
        resolve: { resolvedData: productResolver },
      },
      {
        path: ':id/edit',
        component: ProductEditComponent,
        resolve: { resolvedData: productResolver },
        children: [
          { path: '', redirectTo: 'info', pathMatch: 'full' },
          { path: 'info', component: ProductEditInfoComponent },
          { path: 'tags', component: ProductEditTagsComponent },
        ],
      },
    ],
  },
  { path: 'messages', component: MessagesComponent, outlet: 'popup' },
  { path: 'login', component: LoginComponent },
  { path: 'welcome', component: HomeComponent },
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];
