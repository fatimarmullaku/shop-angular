import {Component, OnInit} from '@angular/core';
import {CustomersService} from './customers.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-costumers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
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
      email: [''],
      phoneNumber: [''],
      recordStatus: [''],
      createDateTime: [''],
      updateDateTime: [''],
      deletedDateTime: [''],
      description: [''],
      version: [''],
    });

    this.updateForm = this.formBuilder.group({
      email: [''],
      phoneNumber: [''],
      recordStatus: [''],
      updateDateTime: [''],
      deletedDateTime: [''],
      description: [''],
      version: [''],
    });

    console.log(this.updateForm)

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

  }

  open(deleteModal, id) {
    this.modalService.open(deleteModal);
    this.customerId = id;

  }

  onDelete() {
    this.customersService.deleteCostumer(this.customerId).subscribe(
      get => {
        this.customersService.getAllCustomers().subscribe((data: any) => {
          this.customerId = data.result;
        });
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
    console.log(this.customerId);
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
    console.log(values);
  }

  openUpdate(updateModal, id: number,
             email: string,
             phoneNumber: string,
             recordStatus: boolean,
             updateDateTime: Date,
             deletedDateTime: Date,
             description: string,
             version: number) {
    this.modalService.open(updateModal);
    this.customerId = id;
    this.updateForm.controls[' email '].setValue(email);
    this.updateForm.controls[' phoneNumber '].setValue(phoneNumber);
    this.updateForm.controls[' recordStatus '].setValue(recordStatus);
    this.updateForm.controls[' updateDateTime '].setValue(updateDateTime);
    this.updateForm.controls[' deletedDateTime '].setValue(deletedDateTime);
    this.updateForm.controls[' description '].setValue(description);
    this.updateForm.controls[' version '].setValue(version);

    console.log(this.updateForm.value);
  }

 openModalf(content, customerId) {
    this.modalService.open(content);
 }

}
