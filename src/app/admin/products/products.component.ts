import {Component, OnInit} from '@angular/core';
import {ProductsService} from './products.service';
import {ProductsModel} from './products.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  productId;
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
      unitPrice: [''],
      inStock: [''],
      // category:[''],
      createDateTime: [''],
      updateDateTime: [''],
      deletedDateTime: [''],
      description: [''],
      version: ['']
    });

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

  }

  onDelete() {
    this.productsService.deleteProduct(this.productId).subscribe(
      get => {
        this.productsService.getAllProducts().subscribe((data: any) => {
          this.productsList = data;
        });
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
    console.log(this.productId);
  }


  open(deleteModal, id) {
    this.modalService.open(deleteModal);
    this.productId = id;
    console.log(this.productId);
  }


  openBackDropCustomClass(content) {
    this.modalService.open(content, {backdropClass: 'light-blue-backdrop'});
  }

  openWindowCustomClass(content) {
    this.modalService.open(content, { windowClass: 'dark-modal' });
  }

  openSm(content) {
    this.modalService.open(content, { size: 'sm' });
  }

  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }



}
