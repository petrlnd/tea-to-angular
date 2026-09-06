import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { MainRoutingModule } from './main-routing.module';

import { MainComponent } from './main.component';
import { BannerComponent } from './banner/banner.component';
import { FaqComponent } from './faq/faq.component';
import { PopupComponent } from './popup/popup.component';

@NgModule({
  declarations: [
    MainComponent,
    BannerComponent,
    FaqComponent,
    PopupComponent
  ],
  imports: [
    SharedModule,
    MainRoutingModule
  ]
})
export class MainModule { }
