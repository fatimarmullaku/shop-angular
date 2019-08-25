import {Component, OnInit} from '@angular/core';
import {ProductsService} from './products.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  deleteModal = false;
  updateModal = false;
  insertModal = false;

  productId: number;
  productsList: any;
  productsForm: FormGroup;
  updateForm: FormGroup;

  constructor(private productsService: ProductsService,
              private modalService: NgbModal,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.productsService.getAllProducts().subscribe((data: any) => {
      this.productsList = data;
      console.log(this.productsList);
    });

    this.productsForm = this.formBuilder.group({
      id: [],
      name: [''],
      category: [''],
      brand: [''],
      unitPrice: [],
      inStock: [],
      recordStatus: [''],
      createDateTime: [''],
      updateDateTime: [''],
      deletedDateTime: [''],
      description: [''],
      version: [0]
    });

    this.updateForm = this.formBuilder.group({
      name: [''],
      category: [''],
      brand: [''],
      unitPrice: [],
      inStock: [],
      recordStatus: [''],
      deletedDateTime: [''],
      description: [''],
      version: ['']
    });

    console.log(this.updateForm);
  }

  onSubmit() {
    const values = this.productsForm.value;
    this.productsService.registerProduct(values).subscribe(
      get => {
        this.productsService.getAllProducts().subscribe((data: any) => {
          this.productsList = data;
        });
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );

    this.insertModal = false;

  }

  openDelete(pid) {
    this.deleteModal = true;
    this.productId = pid;
    console.log(this.productId);
  }

  onDelete() {
    this.productsService.deleteProduct(this.productId).subscribe(
      get => {
        this.productsService.getAllProducts().subscribe((data: any) => {
          this.productsList = data;
        });
        console.log("pitepite");
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
    this.toggleModal();
    console.log('pitepite'+ this.productId);
  }

  openUpdate(
    id: number,
    name: string,
    unitPrice: number,
    inStock:number,
    recordStatus: string,
    updateDateTime: Date,
    deletedDateTime: Date,
    description: string,
    version: number) {
    this.updateModal = true;
    this.productId = id;
    this.updateForm.controls.name.setValue(name);
    this.updateForm.controls.unitPrice.setValue(unitPrice);
    this.updateForm.controls.inStock.setValue(inStock);
    this.updateForm.controls.recordStatus.setValue(recordStatus);
    this.updateForm.controls.updateDateTime.setValue(updateDateTime);
    this.updateForm.controls.deletedDateTime.setValue(deletedDateTime);
    this.updateForm.controls.description.setValue(description);
    this.updateForm.controls.version.setValue(version);

  }

  onUpdate() {
    const values = this.updateForm.value;
    console.log(values)
    this.productsService.updateProduct(values, this.productId).subscribe(
      get => {
        this.productsService.getAllProducts().subscribe((data: any) => {
          this.productsList = data;
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

  closeUpdateModal() {
    this.updateModal = !this.updateModal;
    this.updateForm.reset();
  }

  closeInsertModal() {
    this.insertModal = !this.insertModal;
    this.updateForm.reset();
  }

  toggleModal() {
    this.deleteModal = !this.deleteModal;
  }
}
