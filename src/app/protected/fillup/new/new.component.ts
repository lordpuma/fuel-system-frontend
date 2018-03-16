import { Component, OnDestroy, OnInit } from '@angular/core';
import gql from 'graphql-tag';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { gasFillupsQuery } from '../list/list.component';

const newFillupMutation = gql`
  mutation newFillupMutation($kart: Int!, $liters: Int!) {
    gasFillup{
      new (liters: $liters, kart: $kart) {
        id
        liters
        kart
        date
      }
    }
  }
`;

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit, OnDestroy {
  newFillupForm: FormGroup;

  constructor(private fb: FormBuilder,
              private apollo: Apollo,
              private router: Router,
  ) { }

  ngOnInit() {
    this.newFillupForm = this.fb.group({
      kart: '',
      liters: '',
    });
  }

  save() {
    if (this.newFillupForm.valid) {
      this.apollo.mutate({
        mutation: newFillupMutation,
        variables: {
          kart: this.newFillupForm.value['kart'],
          liters: this.newFillupForm.value['liters'],
        },
        optimisticResponse: {
          __typename: 'Mutation',
          gasFillup: {
            __typename: 'GasFillupMutation',
            new: {
              __typename: 'GasFillup',
              id: Math.random(),
              liters: this.newFillupForm.value['liters'],
              kart: this.newFillupForm.value['kart'],
              date: new Date(),
            }
          }
        },
        update: (proxy, { data: { gasFillup } }) => {
          const data = <{gasFillup: Array<any>}> proxy.readQuery({ query: gasFillupsQuery });
          data.gasFillup.push(gasFillup.new);
          proxy.writeQuery({ query: gasFillupsQuery, data });
        },
      }).toPromise().then(res => {
        this.router.navigate(['/protected/fillup']);
      }).catch(err => console.log(err));
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
