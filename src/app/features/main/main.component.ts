import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  isPopupVisible = false;

  private popupSubscription: Subscription | null = null;

  ngOnInit(): void {
    this.popupSubscription = timer(10000).subscribe(() => {
      this.isPopupVisible = true;
    });
  }

  ngOnDestroy(): void {
    this.popupSubscription?.unsubscribe();
  }

  closePopup(): void {
    this.isPopupVisible = false;
  }
}
