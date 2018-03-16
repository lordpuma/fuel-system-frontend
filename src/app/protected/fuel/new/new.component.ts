import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Router } from '@angular/router';
import { gasPurchasesQuery } from '../list/list.component';

const newFuelMutation = gql`
  mutation newFuelMutation($price: Int!, $liters: Int!) {
    gasPurchase{
      new (liters: $liters, price: $price) {
        id
        liters
        price
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
export class NewComponent implements OnInit {
  newFuelForm: FormGroup;

  constructor(private fb: FormBuilder,
              private apollo: Apollo,
              private router: Router,
  ) { }

  ngOnInit() {
    this.newFuelForm = this.fb.group({
      price: '',
      liters: '',
    });
  }

  save() {
    if (this.newFuelForm.valid) {
      this.apollo.mutate({
        mutation: newFuelMutation,
        variables: {
          price: this.newFuelForm.value['price'],
          liters: this.newFuelForm.value['liters'],
        },
        optimisticResponse: {
          __typename: 'Mutation',
          gasPurchase: {
            __typename: 'GasPurchaseMutation',
            new: {
              __typename: 'GasPurchase',
              id: Math.random(),
              liters: this.newFuelForm.value['liters'],
              price: this.newFuelForm.value['price'],
              date: new Date(),
            }
          }
        },
        update: (proxy, { data: { gasPurchase } }) => {
          // Read the data from our cache for this query.
          const data = <{gasPurchases: Array<any>}> proxy.readQuery({ query: gasPurchasesQuery });
          // Add our comment from the mutation to the end.
          data.gasPurchases.push(gasPurchase.new);
          proxy.writeQuery({ query: gasPurchasesQuery, data });
        },
      }).toPromise().then(res => {
          this.router.navigate(['/protected/fuel']);
      }).catch(err => console.log(err));
    }
  }

}
