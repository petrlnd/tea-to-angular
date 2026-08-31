import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './pages/main/main.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { ProductComponent } from './pages/product/product.component';
import { OrderComponent } from './pages/order/order.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: 'product/:id', component: ProductComponent },
  { path: 'order', component: OrderComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
