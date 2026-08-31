import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription, timer } from 'rxjs';

import { OrderService } from '../../common/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {
  orderForm: FormGroup;

  isSubmitting = false;
  isSent = false;
  errorMessage = '';

  private queryParamsSubscription: Subscription | null = null;
  private submitSubscription: Subscription | null = null;
  private errorTimerSubscription: Subscription | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {
    this.orderForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[а-яёА-ЯЁa-zA-Z]+$/)]],
      last_name: ['', [Validators.required, Validators.pattern(/^[а-яёА-ЯЁa-zA-Z]+$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?\d{11}$/)]],
      country: ['', [Validators.required]],
      zip: ['', [Validators.required]],
      product: [{ value: '', disabled: true }],
      address: ['', [Validators.required, Validators.pattern(/^[а-яёА-ЯЁa-zA-Z0-9\s\/-]+$/)]],
      comment: ['']
    });
  }

  ngOnInit(): void {
    this.queryParamsSubscription = this.route.queryParams.subscribe(params => {
      this.orderForm.get('product')?.setValue(params['product'] ?? '');
    });
  }

  ngOnDestroy(): void {
    this.queryParamsSubscription?.unsubscribe();
    this.submitSubscription?.unsubscribe();
    this.errorTimerSubscription?.unsubscribe();
  }

  isInvalid(controlName: string): boolean {
    const control = this.orderForm.get(controlName);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  onSubmit(): void {
    if (this.orderForm.invalid) {
      this.orderForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    this.submitSubscription = this.orderService.createOrder(this.orderForm.getRawValue())
      .subscribe({
        next: response => {
          this.isSubmitting = false;

          if (response.success === 1) {
            this.isSent = true;
          } else {
            this.showError();
          }
        },
        error: () => {
          this.isSubmitting = false;
          this.showError();
        }
      });
  }

  private showError(): void {
    this.errorMessage = 'Произошла ошибка. Попробуйте еще раз.';

    this.errorTimerSubscription?.unsubscribe();
    this.errorTimerSubscription = timer(3000).subscribe(() => this.errorMessage = '');
  }
}
