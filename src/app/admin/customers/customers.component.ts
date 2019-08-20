import {Component, OnInit} from '@angular/core';
import {CustomersService} from './customers.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {HttpErrorResponse} from '@angular/common/http';
import {CustomerModel} from './customer.model';

@Component({
  selector: 'app-costumers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  deleteModal = false;
  updateModal = false;
  insertModal = false;

  customersList: any;
  customersForm: FormGroup;
  customerId: number;
  updateForm: FormGroup;


  constructor(private customersService: CustomersService,
              private formBuilder: FormBuilder,
              private modalService: NgbModal) {
  }

  ngOnInit() {
    this.customersService.getAllCustomers().subscribe((data: any) => {
      this.customersList = data;
      console.log(this.customersList);
    });

    this.customersForm = this.formBuilder.group({
      id: [],
      email: ['', Validators.required],
      phoneNumbers: [''],
      recordStatus: [''],
      createDateTime: [''],
      updateDateTime: [''],
      deletedDateTime: [''],
      description: [''],
      version: [''],
    });

    this.updateForm = this.formBuilder.group({
      email: [''],
      phoneNumbers: [],
      recordStatus: [''],
      updateDateTime: [],
      deletedDateTime: [],
      description: [''],
      version: [],
    });

    console.log(this.updateForm);

  }

  onSubmit() {
    const values = this.customersForm.value[1];
    console.log('on Submit', values);
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
  }


  onDelete() {
    this.customersService.deleteCostumer(this.customerId).subscribe(
      get => {
        this.customersService.getAllCustomers().subscribe((data: any) => {
          this.customerId = data;
        });
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
    this.toggleModal();

  }

  onUpdate() {
    const values = this.updateForm.value;
    this.customersService.updateCustomer(values).subscribe(
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
  }

  openInsert() {
    console.log('insert is called');
    this.insertModal = true;
    console.log('from open insert', this.insertModal);
  }

  openUpdate(
    id,
    email,
    phoneNumbers,
    recordStatus,
    updateDateTime,
    deletedDateTime,
    description,
    version: number) {
    this.customerId = id;
    this.updateModal = true;
    this.updateForm.controls.email.setValue(email);
    this.updateForm.controls.phoneNumbers.setValue(phoneNumbers);
    this.updateForm.controls.recordStatus.setValue(recordStatus);
    this.updateForm.controls.updateDateTime.setValue(updateDateTime);
    this.updateForm.controls.deletedDateTime.setValue(deletedDateTime);
    this.updateForm.controls.description.setValue(description);
    this.updateForm.controls.version.setValue(version);

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


}
