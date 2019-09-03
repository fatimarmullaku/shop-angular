import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MinComponent } from './layout/min/min.component';
import { BaseComponent } from './layout/base/base.component';
import {RouterModule} from '@angular/router';
import { HeaderComponent } from './header/header.component';
import {HttpClientModule} from '@angular/common/http';
import { PublisherDropdownComponent } from './header/publisher-dropdown/publisher-dropdown.component';
import {ModalModule} from 'ngx-bootstrap';
import { PoliceComponent } from '../shop/police/police.component';

@NgModule({
  declarations: [MinComponent, BaseComponent, HeaderComponent, PublisherDropdownComponent, PoliceComponent],
  exports: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    ModalModule.forRoot()
  ]
})
export class SharedModule { }
