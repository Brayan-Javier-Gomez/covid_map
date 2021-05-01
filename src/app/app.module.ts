import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
// importaciones
import { AgmCoreModule } from '@agm/core';
import {HttpClientModule} from '@angular/common/http';
import {SidebarModule} from 'ng-sidebar';
import * as $ from 'jquery';


@NgModule({
  declarations: [
    AppComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,

    AppRoutingModule,

    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA6g9ChMKq-OQfzZFVupP-GDNGAmd8NMUA'
    }),

    HttpClientModule,

    SidebarModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
