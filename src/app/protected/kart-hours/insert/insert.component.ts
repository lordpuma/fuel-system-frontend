import { Component, OnDestroy, OnInit } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { Subscription } from 'rxjs/Subscription';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

const kartsQuery = gql`
  query karts($date: String!) {
    karts {
      id
      number
      hours(date: $date)
    }
  }
`;

const motoHoursMutation = gql`
  mutation saveMotohours($kartHours: [KartHoursInput]) {
    kartHours {
      new(kartHours: $kartHours) {
        id
        hours
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
  karts: Array<any>;
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
      items: this.fb.array([]),
    });
    this.query = this.apollo.watchQuery({
      query: kartsQuery,
      variables: {
        date: new Date(),
      },
    });
    this.subscription = this.query.valueChanges.subscribe(res => {
      this.karts = res.data.karts;
      this.insertForm.setControl('items', new FormArray([]));
      this.karts.forEach(kart => {
        const items = this.insertForm.get('items') as FormArray;
        items.push(this.createItem(kart));
      });
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

  createItem(kart): FormGroup {
    return this.fb.group({
      hours: kart.hours,
      kartId: kart.id,
    });
  }

  kartNumber(kartId: number): number {
    return this.karts.find(kart => kart.id === kartId).number;
  }

  save(): void {
    this.apollo
      .mutate({
        mutation: motoHoursMutation,
        variables: {
          kartHours: this.insertForm.controls.items.value.filter(
            value => value.hours !== null,
          ),
        },
      })
      .subscribe(res => {
        this.router.navigate(['/protected/fuel']); // TODO: Correct redirect
      });
  }
}
