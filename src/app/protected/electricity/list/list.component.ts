import { Component, OnDestroy, OnInit } from '@angular/core';
import gql from 'graphql-tag';
import { Subscription } from 'rxjs/Subscription';
import { Apollo, QueryRef } from 'apollo-angular';
import { Router } from '@angular/router';

export const electricitiesQuery = gql`
  query {
    electricities {
      id
      date
      meter1
      meter2
    }
  }
`;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
  electricities: Array<any>;
  query: QueryRef<any>;
  subscription: Subscription;

  constructor(private apollo: Apollo, private router: Router) {}

  ngOnInit() {
    this.query = this.apollo.watchQuery({
      query: electricitiesQuery,
    });
    this.subscription = this.query.valueChanges.subscribe(res => {
      this.electricities = res.data.electricities;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  navigateToNew(): void {
    this.router.navigate(['protected/electricity/insert']);
  }
}
