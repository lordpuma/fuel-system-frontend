import { Component, OnDestroy, OnInit } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { Subscription } from 'rxjs/Subscription';

const userQuery = gql`query {
  userByMe {
    username
  }
}`;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  user;
  query: QueryRef<any>;
  subscription: Subscription;

  constructor(private apollo: Apollo) { }

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

}
