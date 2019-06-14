import 'reflect-metadata';
import '../polyfills';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {HttpClient, HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
// NG Translate
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {ElectronService} from './provider/electron.service';

import {WebviewDirective} from './directive/webview.directive';

import {AppComponent} from './app.component';
import {HomeComponent} from './component/home/home.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ShareModule} from './shared/share.module';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WebviewDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    }),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    NgbModule,

    ShareModule
  ],
  providers: [
    ElectronService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
