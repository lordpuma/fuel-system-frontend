import { Component, OnDestroy, OnInit } from '@angular/core';
import gql from 'graphql-tag';
import { Router } from '@angular/router';
import { Apollo, QueryRef } from 'apollo-angular';
import { Subscription } from 'rxjs/Subscription';

export const kartsQuery = gql`
  query kartsQuery {
    karts {
      id
      number
    }
  }
`;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
  karts: Array<any>;
  query: QueryRef<any>;
  subscription: Subscription;

  constructor(private apollo: Apollo, private router: Router) {}

  ngOnInit() {
    this.query = this.apollo.watchQuery({
      query: kartsQuery,
    });
    this.subscription = this.query.valueChanges.subscribe(res => {
      this.karts = res.data.karts;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  navigateToNew(): void {
    this.router.navigate(['/protected/kart/new']);
  }
}
