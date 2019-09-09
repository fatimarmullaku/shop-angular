import {Injectable} from '@angular/core';
import {UserService} from '../user.service';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {BaseStorageService} from '../base-storage.service';
import {LocalStorageKey} from '../../constants/local-storage-key';

@Injectable({
  providedIn: 'root'
})
export class ShopAuthGuardService implements CanActivate {

  constructor(private userService: UserService,
              private router: Router,
              private baseStorage: BaseStorageService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean |
    UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const accessToken: [] = this.baseStorage.getStorageOf(LocalStorageKey.ACCESS_TOKEN, true);
    const temp = false;
    if (accessToken && accessToken.length > 0) {
      return true;
    }
    this.router.navigateByUrl('/');
    alert('YOU\'RE NOT LOGGED IN');
    return false;
  }
}
