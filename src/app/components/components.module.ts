import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OlMapComponent } from './map/ol-map/ol-map.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [OlMapComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    OlMapComponent
  ]
})
export class ComponentsModule { }
