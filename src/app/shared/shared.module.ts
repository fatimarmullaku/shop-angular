import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MinComponent } from './layout/min/min.component';
import { BaseComponent } from './layout/base/base.component';
import {RouterModule} from '@angular/router';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [MinComponent, BaseComponent, HeaderComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule { }
