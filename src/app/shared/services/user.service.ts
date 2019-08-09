import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  loggedIn = false;

  constructor() { }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }
}
