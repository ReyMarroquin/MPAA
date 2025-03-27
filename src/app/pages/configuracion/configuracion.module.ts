import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateLoader } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { ConfiguracionPageRoutingModule } from './configuracion-routing.module';
import { HttpClient } from '@angular/common/http';
import { ConfiguracionPage } from './configuracion.page';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpLoaderFactory } from '../../app.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfiguracionPageRoutingModule,
    HttpClientModule,
    TranslateModule.forChild({
      loader:{
        provide: TranslateLoader,
        useFactory:HttpLoaderFactory,
        deps:[HttpClient]
      }
    })
  ],
  //declarations: [ConfiguracionPage]
})
export class ConfiguracionPageModule {}
