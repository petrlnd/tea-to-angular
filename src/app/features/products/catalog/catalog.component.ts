import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';

import { ProductService } from '../../../shared/services/product.service';
import { SearchService } from '../../../shared/services/search.service';
import { ProductType } from '../../../shared/types/product.type';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit, OnDestroy {
  products: ProductType[] = [];
  isLoading = false;
  errorMessage = '';
  searchQuery = '';

  private subscription: Subscription | null = null;

  constructor(
    private productService: ProductService,
    private searchService: SearchService
  ) { }

  get title(): string {
    return this.searchQuery
      ? `Результаты поиска по запросу «${this.searchQuery}»`
      : 'Наши чайные коллекции';
  }

  ngOnInit(): void {
    this.subscription = this.searchService.search$
      .pipe(
        tap(search => {
          this.searchQuery = search;
          this.isLoading = true;
          this.errorMessage = '';
        }),
        switchMap(search => this.loadProducts(search))
      )
      .subscribe(products => {
        this.products = products;
        this.isLoading = false;
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  private loadProducts(search: string): Observable<ProductType[]> {
    return this.productService.getProducts(search).pipe(
      catchError(() => {
        this.errorMessage = 'Не удалось загрузить товары. Попробуйте обновить страницу.';
        return of([] as ProductType[]);
      })
    );
  }
}
