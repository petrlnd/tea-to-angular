import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ProductService } from './product.service';
import { ProductType } from '../types/product.type';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  const rawProduct = {
    id: 1,
    image: 'http://testologia.ru/tea-images/product1.png',
    title: 'Тестовый чай',
    price: 100,
    description: 'Описание'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });

    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the products from the API', () => {
    let result: ProductType[] = [];
    service.getProducts().subscribe(products => result = products);

    httpMock.expectOne('https://testologia.ru/tea').flush([rawProduct]);

    expect(result.length).toBe(1);
    expect(result[0].title).toBe('Тестовый чай');
  });

  it('should pass null through when the product is not found', () => {
    let result: ProductType | null | undefined;
    service.getProduct(999).subscribe(product => result = product);

    httpMock.expectOne(r => r.url === 'https://testologia.ru/tea').flush(null);

    expect(result).toBeNull();
  });

  it('should not send the search param when the query is empty', () => {
    service.getProducts().subscribe();

    const request = httpMock.expectOne(r => r.url === 'https://testologia.ru/tea');
    expect(request.request.params.has('search')).toBeFalse();
    request.flush([]);
  });

  it('should send the search param when the query is set', () => {
    service.getProducts('Улун').subscribe();

    const request = httpMock.expectOne(r => r.url === 'https://testologia.ru/tea');
    expect(request.request.params.get('search')).toBe('Улун');
    request.flush([]);
  });
});
