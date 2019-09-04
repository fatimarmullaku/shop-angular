import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../shared/services/user.service';
import {UserRegisterModel} from '../../../shared/models/user-register.model';
import {Router} from '@angular/router';
import {BaseStorageService} from '../../../shared/services/base-storage.service';
import {LocalStorageKey} from '../../../shared/constants/local-storage-key';
import {MustMatch} from "./must-match-validator";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  isRegistered = false;
  submitted = false;

  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private routerLink: Router,
              private baseStorageService: BaseStorageService) {
  }

  get f() {
    return this.registerForm.controls;
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }


  onRegisterSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    const payload = new UserRegisterModel();
    payload.name = this.f.firstName.value + ' ' + this.f.lastName.value;
    payload.email = this.f.email.value;
    payload.user = {
      email: this.f.email.value,
      password: this.f.password.value
    };
    const cartStorage = this.baseStorageService.getStorageOf(LocalStorageKey.CART);
    this.userService.register(payload)
      .subscribe((res) => {
        this.userService.login(payload.user.email, payload.user.password)
          .subscribe(r => {
            this.isRegistered = true;
            if (cartStorage != null && cartStorage.length > 0) {
              this.routerLink.navigateByUrl('/auth/additional-information');
            } else if (cartStorage == null || cartStorage.length == 0) {
              this.routerLink.navigateByUrl('/auth/additional-information');
            }

          }, (err) => {
            console.error(err);
          });
      }, (err) => {
        alert(err.error.errorMessage);
      });
  }
}
