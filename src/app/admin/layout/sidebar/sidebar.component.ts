import {Component, OnInit, ViewChild} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {LocalStorageKey} from '../../../shared/constants/local-storage-key';
import {HttpRequestMethod} from '../../../shared/constants/http-request.method';
import {ENDPOINTS} from '../../../shared/constants/api.constants';
import {StatsService} from '../../orders/stats/stats.service';
import {StorageService} from '../../../shared/services/storage.service';
import {RestService} from '../../../shared/services/rest.service';
import {BaseStorageService} from '../../../shared/services/base-storage.service';
import {UserService} from '../../../shared/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @ViewChild('drawer', {static: false}) drawer: any;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  username: string;
  role = 'Administrator';

  ngOnInit(): void {
    this.fetchUser();
  }

  constructor(private breakpointObserver: BreakpointObserver,
              private router: Router,
              private storageService: StorageService,
              private restService: RestService,
              private baseStorageService: BaseStorageService,
              public userService: UserService) {
  }


  closeSideNav() {
    if (this.drawer._mode === 'over') {
      this.drawer.close();
    }
  }


  onMyProfile() {
    this.router.navigate(['/my-profile']);
  }

  fetchUser(): void {
    const customerId = this.baseStorageService.getStorageOf(LocalStorageKey.CUSTOMER_ID, true);
    this.restService.request<any>(HttpRequestMethod.GET, ENDPOINTS.customers.getAll + `/${customerId}`).subscribe((res) => {
        this.username = res.name;
      },
      (err) => {
        console.log(err);
      });
  }
}
