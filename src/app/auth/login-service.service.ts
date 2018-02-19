import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginServiceService {
  public isLogged = false;

  constructor(private apollo: Apollo) {
    if (!!localStorage.getItem('token')) {
      this.isLogged = true;
    }
  }

  login(token: string): void {
    localStorage.setItem('token', token);
    this.isLogged = true;
  }

  logout(): void {
    this.isLogged = false;
    localStorage.removeItem('token');
    this.apollo.getClient().resetStore();
  }
}
