import {Component, OnInit} from '@angular/core';
import {CustomersService} from './customers.service';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {CustomerModel} from './customer.model';

@Component({
  selector: 'app-costumers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  deleteModal = false;
  filter: string;
  updateModal = false;
  insertModal = false;
  customersList: CustomerModel[];
  customersForm: FormGroup;
  datePicker: Date;
  searchPicker: string;
  addressesArray: FormArray;
  customerId: number;
  updateForm: FormGroup;


  constructor(private customersService: CustomersService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.customersService.getAllCustomers().subscribe((data: CustomerModel[]) => {
      this.customersList = data;
      console.log('from ts', this.customersList);
    });

    this.customersForm = this.fb.group({
      id: new FormControl(),
      name: [''],
      email: new FormControl('', Validators.required),
      addresses: this.fb.array([]),
      createDateTime: [],
      updateDateTime: [],
      deletedDateTime: [],
      description: [''],
      version: [''],
      phoneNumber: []
    });
    this.addressesArray = this.customersForm.get('addresses') as FormArray;
    this.addressesArray.push(this.fb.group({
      city: '',
      country: '',
      street: '',
      zip_code: ''
    }));

  }

  onDelete() {
    this.customersService.deleteCostumer(this.customerId).subscribe(
      get => {
        this.customersService.getAllCustomers().subscribe((data: any) => {
          this.customersList = data;
        });
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
    this.toggleModal();
  }


  openInsert() {
    this.insertModal = true;
  }

  closeInsertModal() {
    this.insertModal = !this.insertModal;
    this.customersForm.reset();
  }

  toggleModal() {
    this.deleteModal = !this.deleteModal;
  }

  openDelete(cid) {
    this.deleteModal = true;
    this.customerId = cid;
    console.log(this.customerId);
  }

  transformCity(addresses: any) {
    return addresses.map(item => item.city);
  }


}
