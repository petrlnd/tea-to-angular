import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

declare const bootstrap: {
  Carousel: new (element: Element, config?: { interval?: number }) => unknown;
} | undefined;

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements AfterViewInit {
  @ViewChild('carousel') private carousel!: ElementRef<HTMLElement>;

  banners = [
    { image: 'assets/images/banner-1.png', alt: 'Чайник и чашка 1' },
    { image: 'assets/images/banner-2.png', alt: 'Чайник и чашка 2' },
    { image: 'assets/images/banner-3.png', alt: 'Чайник и чашка 3' }
  ];

  ngAfterViewInit(): void {
    if (typeof bootstrap !== 'undefined') {
      new bootstrap.Carousel(this.carousel.nativeElement, { interval: 5000 });
    }
  }
}
