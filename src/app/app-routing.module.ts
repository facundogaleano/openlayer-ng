import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { OlMapComponent } from './components/map/ol-map/ol-map.component';
import { OlMapAdvancedComponent } from './components/map/ol-map-advanced/ol-map-advanced.component';

const routes: Routes = [
  {
    path: 'olmap',
    component: OlMapComponent
  },
  {
    path: 'advanced',
    component: OlMapAdvancedComponent
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
