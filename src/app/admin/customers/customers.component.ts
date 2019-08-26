import {Component, OnInit} from '@angular/core';
import {CustomersService} from './customers.service';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {CustomerModel} from './customer.model';
import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf';

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
  phoneNumbersArray: FormArray;
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
      phoneNumbers: this.fb.array([]),
      addresses: this.fb.array([]),
      recordStatus: [''],
      createDateTime: [],
      updateDateTime: [],
      deletedDateTime: [],
      description: [''],
      version: ['']
    });
    this.addressesArray = this.customersForm.get('addresses') as FormArray;
    this.phoneNumbersArray = this.customersForm.get('phoneNumbers') as FormArray;
    this.addressesArray.push(this.fb.group({
      city: '',
      country: '',
      street: '',
      zip_code: ''
    }));
    this.phoneNumbersArray.push(this.fb.group({
      phoneNumber:''
    }));


    this.updateForm = this.fb.group({
      email: [''],
      phoneNumbers: [],
      recordStatus: [''],
      updateDateTime: [],
      deletedDateTime: [],
      description: [''],
      version: [],
      address: [],

    });

    console.log(this.updateForm);

  }

  public captureScreen() {
    const data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      // const pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      const position = 10;
      /*pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('customers.pdf');*/
    });
  }


  onSubmit() {
    const values = this.customersForm.value;
    this.customersService.registerCustomer(values).subscribe(
      get => {
        this.customersService.getAllCustomers().subscribe((data: any) => {
          this.customersList = data;
        });
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
    this.insertModal = false;
    this.customersForm.reset();
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

  onUpdate() {
    const values = this.customersForm.value;
    this.customersService.updateCustomer(values, this.customerId).subscribe(
      get => {
        this.customersService.getAllCustomers().subscribe((data: any) => {
          this.customersList = data;
        });
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
    this.updateModal = false;
    this.customersForm.reset();
  }

  openInsert() {
    console.log('insert is called');
    this.insertModal = true;
    console.log('from open insert', this.insertModal);
  }

  openUpdate(
    id,
    email,
    name,
    phoneNumber,
    recordStatus,
    updateDateTime,
    deletedDateTime,
    description,
    version: number) {
    this.customerId = id;
    this.updateModal = true;
    this.customersForm.controls.email.setValue(email);
    this.customersForm.controls.name.setValue(name);
    this.customersForm.controls.phoneNumbers.setValue(phoneNumber);
    this.customersForm.controls.recordStatus.setValue(recordStatus);
    this.customersForm.controls.updateDateTime.setValue(updateDateTime);
    this.customersForm.controls.deletedDateTime.setValue(deletedDateTime);
    this.customersForm.controls.description.setValue(description);
    this.customersForm.controls.version.setValue(version);

  }

  closeUpdateModal() {
    this.updateModal = !this.updateModal;
    this.updateForm.reset();
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

  transformNumber(phoneNumbers: any) {
    return phoneNumbers.map(item => item.phoneNumber);
  }

  transformCity(addresses: any) {
    return addresses.map(item => item.city);
  }


}
