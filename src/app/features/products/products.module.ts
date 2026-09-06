import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { ProductsRoutingModule } from './products-routing.module';

import { CatalogComponent } from './catalog/catalog.component';
import { ProductComponent } from './detail/product.component';

@NgModule({
  declarations: [
    CatalogComponent,
    ProductComponent
  ],
  imports: [
    SharedModule,
    ProductsRoutingModule
  ]
})
export class ProductsModule { }
