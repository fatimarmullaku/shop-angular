import {CustomerModel } from './customer.model'
import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
  name: 'pipeFilteer',
  pure: false
})

export class CustomersFPipe implements PipeTransform {


  transform(customers: CustomerModel[], query: string): CustomerModel[] {
    if (!query) {
      return customers;
    } else  {
      return customers.filter((x: CustomerModel) => x.name.toLowerCase().startsWith(query.toLowerCase()));
    }
  }
}

