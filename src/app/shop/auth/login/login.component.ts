import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../shared/services/user.service';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private router: Router, private userService: UserService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', Validators.required),
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onLoginFormSubmit() {
    if (this.loginForm.valid) {
      const payload = {
        email: this.f.email.value,
        password: this.f.password.value
      };
      this.userService.login(payload.email, payload.password).subscribe(res => {

        },
        err => {

        });
    } else {
      alert('form not valid');
    }
  }
}
