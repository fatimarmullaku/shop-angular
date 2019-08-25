import {UserModel} from './user.model';
import {PhoneNumberModel} from './phoneNumber.model';
import {AddressModel} from './address.model';


export class CustomerModel {
  id: number;
  name: string;
  email: string;
  phones: PhoneNumberModel[];
  addresses: AddressModel [];
}
