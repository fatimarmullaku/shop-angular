import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MinComponent } from './layout/min/min.component';
import { BaseComponent } from './layout/base/base.component';
import {RouterModule} from '@angular/router';
import { HeaderComponent } from './header/header.component';
import {HttpClientModule} from '@angular/common/http';
import { PublisherDropdownComponent } from './header/publisher-dropdown/publisher-dropdown.component';

@NgModule({
  declarations: [MinComponent, BaseComponent, HeaderComponent, PublisherDropdownComponent],
  exports: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule
  ]
})
export class SharedModule { }
