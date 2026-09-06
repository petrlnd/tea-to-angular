import { Component } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent {
  banners = [
    { image: 'assets/images/banner-1.png', alt: 'Чайник и чашка 1' },
    { image: 'assets/images/banner-2.png', alt: 'Чайник и чашка 2' },
    { image: 'assets/images/banner-3.png', alt: 'Чайник и чашка 3' }
  ];
}
