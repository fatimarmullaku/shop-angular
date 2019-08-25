import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../shared/services/user.service';
import {UserRegisterModel} from '../../../shared/models/user-register.model';
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  isRegistered = false;

  constructor(private userService: UserService, private formBuilder: FormBuilder,private routerLink: Router) {
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      first_name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(2)
      ])),
      last_name: new FormControl(''),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ])),
      password: new FormControl('', Validators.required),
      confirm_password: new FormControl('', Validators.required),
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onRegisterSubmit() {
    if (this.registerForm.valid) {
      if (this.f.password.value !== this.f.confirm_password.value) {
        alert('Password and confirm password must be the same');
        return false;
      }

      const payload = new UserRegisterModel();
      payload.name = this.f.first_name.value + ' ' + this.f.last_name.value;
      payload.email = this.f.email.value;
      payload.user = {
        email: this.f.email.value,
        password: this.f.password.value
      };

      this.userService.register(payload)
        .subscribe((res) => {
          this.userService.login(payload.user.email, payload.user.password)
            .subscribe(r => {
              this.isRegistered = true;
              this.routerLink.navigateByUrl('/auth/additional-information');

            }, (err) => {
              console.error(err);
            });
        }, (err) => {
          alert(err.error.errorMessage);
        });
    } else {
      alert('register form invalid');
    }
  }

}
