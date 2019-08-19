import {UserModel} from './user.model';
import {PhoneNumberModel} from './phoneNumber.model';
import {AddressModel} from './address.model';


export class CustomerModel {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumbers: PhoneNumberModel[];
  addresses: AddressModel [];
}
