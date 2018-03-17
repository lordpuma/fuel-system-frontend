import { Component, OnDestroy, OnInit } from '@angular/core';
import gql from 'graphql-tag';
import { Subscription } from 'rxjs/Subscription';
import { Apollo, QueryRef } from 'apollo-angular';
import { Router } from '@angular/router';


export const gasFillupsQuery = gql`query {
  gasFillups {
    id
    liters
    date
    kart {
      number
    }
  }
}`;


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  gasFillups: Array<any>;
  query: QueryRef<any>;
  subscription: Subscription;

  constructor(private apollo: Apollo,
              private router: Router,
  ) { }

  ngOnInit() {
    this.query = this.apollo.watchQuery({
      query: gasFillupsQuery,
    });
    this.subscription = this.query.valueChanges.subscribe(res => {
      this.gasFillups = res.data.gasFillups;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  navigateToNew(): void {
    this.router.navigate(['protected/fillup/new']);
  }
}
