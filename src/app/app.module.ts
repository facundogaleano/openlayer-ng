import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { OlMapComponent } from './components/map/ol-map/ol-map.component';
import { PrincipalLayoutComponent } from './pages/principal-layout/principal-layout.component';
import { PrincipalLayoutModule } from './pages/principal-layout/principal-layout.module';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PrincipalLayoutModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
