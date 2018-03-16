import { Component, OnInit } from '@angular/core';

import {Apollo} from 'apollo-angular';
import {LoginServiceService} from '../login-service.service';
import gql from 'graphql-tag';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

const loginMutation = gql`  
  mutation loginMutation ($username: String!, $password: String!) {
    auth {
      login(username: $username, password: $password)
    }
}`;

//TODO: Počet lístků, zapsat motohodiny, a pokladnička

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  credentialsError: boolean;
  loginForm: FormGroup;

  constructor(private apollo: Apollo,
              private loginService: LoginServiceService,
              private router: Router,
              private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: '',
      password: '',
    });
  }

  login() {
    this.apollo.mutate({
      mutation: loginMutation,
      variables: {
        username: this.loginForm.value['username'],
        password: this.loginForm.value['password'],
      }
    }).toPromise()
      .then(response => {
        this.loginService.login(response.data.auth.login);
        this.router.navigate(['/protected/profile']);
        },
          err => {
        this.credentialsError = true;
        console.log(err);
      });
  }

}
