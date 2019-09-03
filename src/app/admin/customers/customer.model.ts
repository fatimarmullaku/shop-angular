import {PhoneModel} from './phone.model';
import {AddressesModel} from './addresses.model';

export class CustomerModel {
  addresses: AddressesModel;
  phoneNumbers: PhoneModel;
  id: number;
  name: string;
  email: string;
  recordStatus: string;
  createDateTime: Date;
  updateDateTime: Date;
  deletedDateTime: Date;
  description: string;
  version: number;
}
