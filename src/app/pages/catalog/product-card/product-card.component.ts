import { Component, Input } from '@angular/core';

import { ProductType } from '../../../common/types/product.type';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {

  @Input() product!: ProductType;
}
