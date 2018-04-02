import { Component, OnDestroy, OnInit } from '@angular/core';
import gql from 'graphql-tag';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Apollo, QueryRef } from 'apollo-angular';
import { gasFillupsQuery } from '../list/list.component';
import { Subscription } from 'rxjs/Subscription';

const newFillupMutation = gql`
  mutation newFillupMutation($kartId: Int!, $liters: Int!) {
    gasFillup {
      new(liters: $liters, kartId: $kartId) {
        id
        liters
        kart {
          id
          number
        }
        date
      }
    }
  }
`;

const kartsQuery = gql`
  query karts {
    karts {
      id
      number
    }
  }
`;

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent implements OnInit, OnDestroy {
  newFillupForm: FormGroup;
  karts: Array<any>;
  query: QueryRef<any>;
  subscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private apollo: Apollo,
    private router: Router,
  ) {}

  ngOnInit() {
    this.newFillupForm = this.fb.group({
      kart: '',
      liters: '',
    });
    this.query = this.apollo.watchQuery({
      query: kartsQuery,
    });
    this.subscription = this.query.valueChanges.subscribe(res => {
      this.karts = res.data.karts;
    });
  }

  save() {
    if (this.newFillupForm.valid) {
      this.apollo
        .mutate({
          mutation: newFillupMutation,
          variables: {
            kartId: this.newFillupForm.value['kart'],
            liters: this.newFillupForm.value['liters'],
          },
          optimisticResponse: {
            __typename: 'Mutation',
            gasFillup: {
              __typename: 'GasFilcdpMutation',
              new: {
                __typename: 'GasFillup',
                id: Math.random(),
                liters: this.newFillupForm.value['liters'],
                kart: {
                  __typename: 'Kart',
                  id: Math.random(),
                  number: this.newFillupForm.value['kart'],
                },
                date: new Date(),
              },
            },
          },
          update: (proxy, { data: { gasFillup } }) => {
            const data = <{ gasFillups: Array<any> }>proxy.readQuery({
              query: gasFillupsQuery,
            });
            data.gasFillups.push(gasFillup.new);
            proxy.writeQuery({ query: gasFillupsQuery, data });
          },
        })
        .toPromise()
        .then(res => {
          this.router.navigate(['/protected/fillup']);
        })
        .catch(err => console.log(err));
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
