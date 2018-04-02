import { Component, OnDestroy, OnInit } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { Subscription } from 'rxjs/Subscription';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { electricitiesQuery } from '../list/list.component';

const electricityQuery = gql`
  query electricity($date: String!) {
    electricityDate(date: $date) {
      id
      meter1
      meter2
    }
  }
`;

const electricityMutation = gql`
  mutation saveElectricity($date: String, $meter1: Int!, $meter2: Int!) {
    electricity {
      new(date: $date, meter1: $meter1, meter2: $meter2) {
        id
        meter1
        meter2
        date
      }
    }
  }
`;

@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.scss'],
})
export class InsertComponent implements OnInit, OnDestroy {
  electricity: any;
  query: QueryRef<any>;
  subscription: Subscription;
  insertForm: FormGroup;

  constructor(
    private apollo: Apollo,
    private fb: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit() {
    this.insertForm = this.fb.group({
      date: new Date().toISOString().substr(0, 10),
      meter1: '',
      meter2: '',
    });
    this.query = this.apollo.watchQuery({
      query: electricityQuery,
      variables: {
        date: new Date(),
      },
    });
    this.subscription = this.query.valueChanges.subscribe(res => {
      if (!res.loading) {
        if (res.data.electricityDate) {
          this.insertForm.controls['meter1'].setValue(
            res.data.electricityDate.meter1,
          );
          this.insertForm.controls['meter2'].setValue(
            res.data.electricityDate.meter2,
          );
        } else {
          this.insertForm.controls['meter1'].setValue('');
          this.insertForm.controls['meter2'].setValue('');
        }
      }
    });
    this.insertForm.controls['date'].valueChanges.subscribe(value => {
      this.query.setVariables({
        date: value,
      });
      this.query.refetch();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  save(): void {
    this.apollo
      .mutate({
        mutation: electricityMutation,
        variables: this.insertForm.value,
        optimisticResponse: {
          __typename: 'Mutation',
          electricity: {
            __typename: 'ElectricityMutation',
            new: {
              __typename: 'Electricity',
              id: Math.random(),
              meter1: this.insertForm.value['meter1'],
              meter2: this.insertForm.value['meter2'],
              date: this.insertForm.value['date'],
            },
          },
        },
        update: (proxy, { data: { electricity } }) => {
          const data = <{ electricities: Array<any> }>proxy.readQuery({
            query: electricitiesQuery,
          });
          data.electricities.push(electricity.new);
          proxy.writeQuery({ query: electricitiesQuery, data });
        },
      })
      .subscribe(res => {
        this.router.navigate(['/protected/electricity/list']);
      });
  }
}
