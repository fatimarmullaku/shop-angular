import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../shared/services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) {
  }

  ngOnInit() {
  }

  onSignInClick(event: any) {
    event.preventDefault();

    this.userService.loggedIn = true;

    setTimeout(() => {
      this.router.navigateByUrl('/');
    }, 2000);
  }
}
