import { Component } from '@angular/core';
import {HostListener} from "@angular/core";

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`
})
export class AppComponent {



  @HostListener('window:beforeunload',['$event'])
  public beforeUnloadHandler($event){
      localStorage.removeItem('accessToken');
      localStorage.removeItem('customerId');
  }
}
