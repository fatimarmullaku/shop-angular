import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './dashboard-base.component.html',
  styleUrls: ['./dashboard-base.component.scss']
})
export class DashboardBaseComponent {
  username = 'Enis Rasimi';
  role = 'Administrator';


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, private router: Router ) {}

  onLogOut() {

  }

  closeSideNav() {

  }



}
