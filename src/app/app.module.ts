import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { BannerComponent } from './pages/main/banner/banner.component';
import { ProductCardComponent } from './pages/catalog/product-card/product-card.component';
import { FaqComponent } from './pages/main/faq/faq.component';
import { OrderComponent } from './pages/order/order.component';
import { MainComponent } from './pages/main/main.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { ProductComponent } from './pages/product/product.component';
import { PopupComponent } from './pages/main/popup/popup.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BannerComponent,
    ProductCardComponent,
    FaqComponent,
    OrderComponent,
    MainComponent,
    CatalogComponent,
    ProductComponent,
    PopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
