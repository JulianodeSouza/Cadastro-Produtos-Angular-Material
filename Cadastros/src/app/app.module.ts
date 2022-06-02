import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { NgxMaskModule, IConfig } from 'ngx-mask';

//Components
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './shared/template/header/header.component';
import { FooterComponent } from './shared/template/footer/footer.component';
import { NavComponent } from './shared/template/nav/nav.component';
import { HomeComponent } from './routes/home/home.component';
import { ProductAddComponent } from './routes/produtos/product-add/product-add.component';
import { ProductComponent } from './routes/produtos/product.component';
import { ProductDetalhesComponent } from './routes/produtos/product-detalhes/product-detalhes.component';
import { CoreModule } from './core/core.module';

registerLocaleData(localePt);

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    HomeComponent,
    ProductAddComponent,
    ProductComponent,
    ProductDetalhesComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    CoreModule,
    NgxMaskModule.forRoot(maskConfig),
  ],
  providers: [{
    provide: LOCALE_ID,
    useValue: 'pt-BR'
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
