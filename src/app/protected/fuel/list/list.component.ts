import { Component, OnDestroy, OnInit } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { Subscription } from 'rxjs/Subscription';
import gql from 'graphql-tag';
import { Router } from '@angular/router';

export const gasPurchasesQuery = gql`query gasPurchasesList{
  gasPurchases {
    id
    liters
    date
    price
  }
}`;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  gasPurchases: Array<any>;
  query: QueryRef<any>;
  subscription: Subscription;

  constructor(private apollo: Apollo,
              private router: Router,
  ) { }

  ngOnInit() {
    this.query = this.apollo.watchQuery({
      query: gasPurchasesQuery,
    });
    this.subscription = this.query.valueChanges.subscribe(res => {
      this.gasPurchases = res.data.gasPurchases;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  navigateToNew(): void {
    this.router.navigate(['/protected/fuel/new']);
  }
}
