import { Component, OnDestroy, OnInit } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { Subscription } from 'rxjs/Subscription';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

const premisesQuery = gql`query premisesQuery{
  premises {
    id
    name
  }
}`;

const ticketsMutation = gql`mutation saveTickets($premiseId: Int!, $count: Int!) {
  tickets {
    new(premiseId: $premiseId, count: $count) {
      id
    }
  }
}`;

@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.scss']
})
export class InsertComponent implements OnInit, OnDestroy {
  premises: Array<any>;
  query: QueryRef<any>;
  subscription: Subscription;
  insertForm: FormGroup;

  constructor(private apollo: Apollo, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.insertForm = this.fb.group({
      premiseId: '',
      count: '',
    });
    this.query = this.apollo.watchQuery({
      query: premisesQuery,
    });
    this.subscription = this.query.valueChanges.subscribe(res => {
      this.premises = res.data.premises;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  save(): void {
    this.apollo.mutate({
      mutation: ticketsMutation,
      variables: this.insertForm.value,
    }).subscribe(res => {
      this.router.navigate(['/protected/fuel']); // TODO: Correct redirect
    });
  }
}
