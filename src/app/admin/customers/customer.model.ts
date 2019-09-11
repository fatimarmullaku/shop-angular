import {AddressesModel} from './addresses.model';

export class CustomerModel {
  addresses: AddressesModel;
  phoneNumber:number;
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
