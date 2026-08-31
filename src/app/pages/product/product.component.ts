import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { ProductService } from '../../common/services/product.service';
import { ProductType } from '../../common/types/product.type';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {
  product: ProductType | null = null;
  isLoading = false;
  isNotFound = false;
  errorMessage = '';

  private subscription: Subscription | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.subscription = this.route.params
      .pipe(
        tap(() => {
          this.isLoading = true;
          this.isNotFound = false;
          this.errorMessage = '';
        }),
        switchMap(params => this.productService.getProduct(Number(params['id'])))
      )
      .subscribe({
        next: product => {
          this.product = product;
          this.isNotFound = !product;
          this.isLoading = false;
        },
        error: () => {
          this.errorMessage = 'Не удалось загрузить товар. Попробуйте обновить страницу.';
          this.isLoading = false;
        }
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  buy(): void {
    if (!this.product) {
      return;
    }

    this.router.navigate(['/order'], {
      queryParams: { product: this.product.title }
    });
  }
}
