import { Component, OnInit } from '@angular/core';
import gql from 'graphql-tag';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { kartsQuery } from '../list/list.component';

const newKartMutation = gql`
  mutation newKartMutation($number: Int!) {
    kart{
      new (number: $number) {
        id
        number
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
  newKartForm: FormGroup;

  constructor(private fb: FormBuilder,
              private apollo: Apollo,
              private router: Router,
  ) { }

  ngOnInit() {
    this.newKartForm = this.fb.group({
      number: '',
    });
  }

  save() {
    if (this.newKartForm.valid) {
      this.apollo.mutate({
        mutation: newKartMutation,
        variables: {
          number: this.newKartForm.value['number'],
        },
        optimisticResponse: {
          __typename: 'Mutation',
          kart: {
            __typename: 'KartMutation',
            new: {
              __typename: 'Kart',
              id: Math.random(),
              number: this.newKartForm.value['number'],
            }
          }
        },
        update: (proxy, { data: { kart } }) => {
          const data = <{karts: Array<any>}> proxy.readQuery({ query: kartsQuery });
          data.karts.push(kart.new);
          proxy.writeQuery({ query: kartsQuery, data });
        },
      }).toPromise().then(res => {
        this.router.navigate(['/protected/kart']);
      }).catch(err => console.log(err));
    }
  }
}
