import {Component, OnInit} from '@angular/core';
import {ProductsService} from './products.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {HttpErrorResponse} from '@angular/common/http';
import {PlatformsService} from '../platforms/platforms.service';
import {BrandsService} from '../brands/brands.service';
import {PlatformsModel} from '../platforms/platforms.model';
import {BrandsModel} from '../brands/brands.model';
import {ProductsModel} from './products.model';
import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  deleteModal = false;
  updateModal = false;
  insertModal = false;
  platformList = PlatformsModel[''];
  brandsList = BrandsModel[''];
  productId: number;
  productsList: ProductsModel[];
  productsForm: FormGroup;
  filter: string;
  updateForm: FormGroup;
  fileForm: FormGroup;
  filePId;
  name = 'Angular';
  image: File;
  selectedFile = null;
  selectedFile2 = null;
  isNotPlatform = true;
  isNotBrand = true;

  constructor(private productsService: ProductsService,
              private modalService: NgbModal,
              private fb: FormBuilder,
              private platformsService: PlatformsService,
              private brandsService: BrandsService) {
  }

  ngOnInit() {
    this.fileForm = this.fb.group({
      files: [],
    });

    this.productsService.getAllProducts().subscribe((data: ProductsModel[]) => {
      this.productsList = data;
      console.log(this.productsList);
    });
    this.platformsService.getAllPlatforms().subscribe((data: any) => {
      this.platformList = data;

      console.log('from products func', data);

    });
    this.brandsService.getAllBrands().subscribe((data: any) => {
      this.brandsList = data;
    });

    this.productsForm = this.fb.group({
      id: [],
      name: [''],
      platform: this.fb.group({
        id: ['', [Validators.required]]
      }),
      brand: this.fb.group({
        id: ['', [Validators.required]]
      }),
      unitPrice: [],
      inStock: [],
      createDateTime: [''],
      updateDateTime: [''],
      deletedDateTime: [''],
      description: [''],
      version: [0]
    });


    this.updateForm = this.fb.group({
      name: [''],
      unitPrice: [],
      inStock: [],
      recordStatus: [''],
      deletedDateTime: [''],
      description: [''],
      version: ['']
    });

    this.fileForm = this.fb.group({
      fileUpload: ['']
    });
  }

  public captureScreen() {
    const data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      const position = 10;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('brandsList.pdf');
    });
  }

  onAddProduct() {
    if (this.productsForm.controls.platform.invalid && this.productsForm.controls.brand.invalid) {
      this.isNotPlatform = false;
      this.isNotBrand = false;
      console.log('Si ki plotsu krejt platform  brand field-at');
    }
    else if (this.productsForm.controls.platform.invalid) {
      this.isNotPlatform = false;
      this.isNotBrand = true;
      console.log('Si ki plotsu krejt platform field-at');
    }
    else if(this.productsForm.controls.brand.invalid)
    {
      this.isNotPlatform = true;
      this.isNotBrand = false;
      console.log('Si ki plotsu krejt brand field-at');
    }
    else {
      this.isNotBrand = true;
      this.isNotPlatform = true;
      const values = this.productsForm.value;
      console.log('from ts', values)
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

      setTimeout(() => {
        this.productsService.getProductId(this.productsForm.controls.name.value).subscribe((data: any) => {
          this.filePId = data;
          console.log('get id from product');
        });
      }, 2000);

      setTimeout(() => {
        const payload = new FormData();
        payload.append('productId', this.filePId);
        payload.append('files', this.selectedFile, this.selectedFile.name);
        this.productsService.uploadFiles(payload);

        this.insertModal = false;
        this.productsForm.reset();
        this.fileForm.reset();
        console.log('post product with image');
      }, 5000);

      this.insertModal = false;
      this.productsForm.reset();
    }
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
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

      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
    this.toggleModal();

  }

  openUpdate(
    id: number,
    name: string,
    unitPrice: bigint,
    inStock: number,
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
    console.log(values);
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

    setTimeout(() => {
      const payload = new FormData();
      payload.append('productId', this.productId.toString());
      payload.append('files', this.selectedFile2, this.selectedFile2.name);
      this.productsService.uploadFiles(payload);

      this.insertModal = false;
      this.productsForm.reset();
      this.fileForm.reset();
      console.log('post product with image update');
    }, 5000);

    this.updateModal = false;
  }

  onFileSelected2(event) {
    this.selectedFile2 = event.target.files[0];
    console.log(this.selectedFile2);
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
    this.productsForm.reset();
    this.fileForm.reset();
  }

  toggleModal() {
    this.deleteModal = !this.deleteModal;
  }

}
