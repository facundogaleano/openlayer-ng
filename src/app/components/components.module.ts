import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OlMapComponent } from './map/ol-map/ol-map.component';
import { FormsModule } from '@angular/forms';
import { OlMapAdvancedComponent } from './map/ol-map-advanced/ol-map-advanced.component';


@NgModule({
  declarations: [OlMapComponent, OlMapAdvancedComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    OlMapComponent
  ]
})
export class ComponentsModule { }
