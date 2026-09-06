import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CatalogComponent } from './catalog.component';
import { SharedModule } from '../../../shared/shared.module';
import { ProductType } from '../../../shared/types/product.type';

describe('CatalogComponent', () => {
  let component: CatalogComponent;
  let fixture: ComponentFixture<CatalogComponent>;

  const products: ProductType[] = [
    { id: 1, image: 'a.png', title: 'Первый чай', price: 100, description: 'Описание 1' },
    { id: 2, image: 'b.png', title: 'Второй чай', price: 200, description: 'Описание 2' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, RouterTestingModule, SharedModule ],
      declarations: [ CatalogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show default title when search is empty', () => {
    component.searchQuery = '';
    expect(component.title).toBe('Наши чайные коллекции');
  });

  it('should show search title when search is set', () => {
    component.searchQuery = 'Улун';
    expect(component.title).toBe('Результаты поиска по запросу «Улун»');
  });

  it('should render a card for every product', () => {
    component.products = products;
    component.isLoading = false;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const titles = Array.from(compiled.querySelectorAll('.card-title')).map(el => el.textContent?.trim());
    const prices = Array.from(compiled.querySelectorAll('.card-price')).map(el => el.textContent?.trim());

    expect(titles).toEqual(['Первый чай', 'Второй чай']);
    expect(prices).toEqual(['100 ₽', '200 ₽']);
  });

  it('should show the empty message when nothing found', () => {
    component.products = [];
    component.isLoading = false;
    fixture.detectChanges();

    const empty = (fixture.nativeElement as HTMLElement).querySelector('.catalog-empty');
    expect(empty?.textContent?.trim()).toBe('Ничего не найдено');
  });
});
