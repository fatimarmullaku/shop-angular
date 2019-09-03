import {Component, OnInit, ViewChild} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @ViewChild('drawer',  {static: false}) drawer: any;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  username = 'Enis Rasimi';
  role = 'Administrator';

  ngOnInit(): void {
  }

  constructor(private breakpointObserver: BreakpointObserver, private router: Router) {
  }


  closeSideNav() {
    if (this.drawer._mode === 'over') {
      this.drawer.close();
    }
  }


  onLogOut() {
    this.router.navigate(['auth/login']);
  }

  onMyProfile() {
    this.router.navigate(['/my-profile']);
  }
}
