import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MinComponent } from './layout/min/min.component';
import { BaseComponent } from './layout/base/base.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [MinComponent, BaseComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule { }
