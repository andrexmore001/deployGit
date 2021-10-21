import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UploadFilesComponent } from './components/upload-files/upload-files.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
// import { GoogleLoginProvider } from 'angularx-social-login';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PdfViewComponent } from './components/pdf-view/pdf-view.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PruebaService } from './interceptors/prueba.service';
import { NgxSpinnerModule } from 'ngx-spinner';
// Google Maps de Angular 9 
import {GoogleMapsModule} from '@angular/google-maps';
import { RuletaComponent } from './components/ruleta/ruleta.component'; 
@NgModule({
  declarations: [
    AppComponent,
    UploadFilesComponent,
    PdfViewComponent,
    RuletaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    PdfViewerModule,
    NgxSpinnerModule,
    GoogleMapsModule
  ],
  providers: [
    //interceptor
    {
      provide:HTTP_INTERCEPTORS,
      useClass:PruebaService,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
