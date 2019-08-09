import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../shared/services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html'
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) {
  }

  ngOnInit() {
    this.userService.loggedIn = false;

    setTimeout(() => {
      this.router.navigateByUrl('/');
    }, 1000);
  }

}
