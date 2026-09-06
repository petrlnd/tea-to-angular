import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbConfig, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, RouterTestingModule, NgbModule ],
      declarations: [ HeaderComponent ]
    })
    .compileComponents();

    TestBed.inject(NgbConfig).animation = false;

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start with collapsed menu', () => {
    expect(component.isMenuCollapsed).toBeTrue();
  });

  it('should toggle the show class on the menu', () => {
    const menu = (fixture.nativeElement as HTMLElement).querySelector('#navbarMenu')!;
    expect(menu.classList.contains('show')).toBeFalse();

    component.isMenuCollapsed = false;
    fixture.detectChanges();

    expect(menu.classList.contains('show')).toBeTrue();
  });

  it('should clear search control on reset', () => {
    component.searchControl.setValue('Улун');
    component.onReset();
    expect(component.searchControl.value).toBe('');
  });
});
