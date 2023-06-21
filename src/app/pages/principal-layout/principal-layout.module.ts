import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalLayoutComponent } from './principal-layout.component';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  declarations: [PrincipalLayoutComponent],
  imports: [
    CommonModule,
    ComponentsModule
  ],
  exports: [
    PrincipalLayoutComponent
  ]
})
export class PrincipalLayoutModule { }
