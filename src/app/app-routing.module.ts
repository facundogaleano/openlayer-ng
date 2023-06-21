import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { OlMapComponent } from './components/map/ol-map/ol-map.component';

const routes: Routes = [
  {
    path: 'olmap',
    component: OlMapComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
