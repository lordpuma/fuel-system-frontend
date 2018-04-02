import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from '../../auth/login-service.service';
import { Apollo, QueryRef } from 'apollo-angular';
import { Subscription } from 'rxjs/Subscription';
import gql from 'graphql-tag';

const userQuery = gql`
  query {
    userByMe {
      username
    }
  }
`;

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit, OnDestroy {
  user;
  query: QueryRef<any>;
  subscription: Subscription;

  constructor(
    private apollo: Apollo,
    private router: Router,
    private authService: LoginServiceService,
  ) {}

  ngOnInit() {
    this.query = this.apollo.watchQuery({
      query: userQuery,
    });
    this.subscription = this.query.valueChanges.subscribe(res => {
      this.user = res.data.userByMe;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
