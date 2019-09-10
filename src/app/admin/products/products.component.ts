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
import {ENDPOINTS} from '../../shared/constants/api.constants';
import {PaginationService} from '../../shared/pagination/pagination.service';
import {PaginationModel} from '../../shared/models/pagination.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [PaginationService]
})
export class ProductsComponent implements OnInit {
  photoUrl = ENDPOINTS.products.getProductImage;
  deleteModal = false;
  updateModal = false;
  insertModal = false;
  platformList: PlatformsModel[];
  brandsList: BrandsModel[];
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
  selectedFile2: File;
  isNotPlatform = true;
  isNotBrand = true;
  currentPage = 1;
  pageSize = 6;

  constructor(private productsService: ProductsService,
              private modalService: NgbModal,
              private fb: FormBuilder,
              private platformsService: PlatformsService,
              private brandsService: BrandsService,
              private paginationService: PaginationService) {
  }

  ngOnInit() {
    this.fileForm = this.fb.group({
      files: [],
    });

    this.paginationService.changeTotalPages(9);
    this.paginationService.currentPage.subscribe(currentPage => {
      this.currentPage = currentPage;
      this.getProductsPaged();
    });

    this.platformsService.getAllPlatforms().subscribe((data: any) => {
      this.platformList = data;
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
      createDateTime: [''],
      updateDateTime: [''],
      deletedDateTime: [''],
      description: [''],
      version: [0]
    });


    this.updateForm = this.fb.group({
      name: [''],
      unitPrice: [],
      platform: this.fb.group({
        id: []
      }),
      brand: this.fb.group({
        id: []
      }),
      recordStatus: [''],
      deletedDateTime: [''],
      description: [''],
      version: [''],
    });

    this.fileForm = this.fb.group({
      fileUpload: ['']
    });
  }

  getProductsPaged() {
    this.productsService.getAllProducts(this.pageSize, this.currentPage - 1).subscribe((data: PaginationModel<ProductsModel>) => {
      this.productsList = data.content;
      this.paginationService.changeTotalPages(data.totalPages);
    });
  }



  onAddProduct() {
    if (this.productsForm.controls.platform.invalid && this.productsForm.controls.brand.invalid) {
      this.isNotPlatform = false;
      this.isNotBrand = false;
    } else if (this.productsForm.controls.platform.invalid) {
      this.isNotPlatform = false;
      this.isNotBrand = true;
    } else if (this.productsForm.controls.brand.invalid) {
      this.isNotPlatform = true;
      this.isNotBrand = false;
    } else {
      this.isNotBrand = true;
      this.isNotPlatform = true;

      const values = this.productsForm.value;
      this.productsService.registerProduct(values).subscribe(
        response => {
          this.filePId = response.id;
          const payload = new FormData();
          if (this.filePId) {
            payload.append('productId', this.filePId);
            payload.append('files', this.selectedFile, this.selectedFile.name);
            this.productsService.uploadFiles(payload).subscribe((data: any) => {
              if (data) {
                this.productsForm.reset();
                this.fileForm.reset();
                this.getProductsPaged();
              }
            });
          }
        }, (err: HttpErrorResponse) => {
          console.log(err);
        });
      this.insertModal = false;
    }
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];

  }

  openDelete(pid) {
    this.deleteModal = true;
    this.productId = pid;
  }

  onDelete() {
    this.productsService.deleteProduct(this.productId).subscribe(
      get => {
        this.getProductsPaged();
      },
      (err: HttpErrorResponse) => {

      }
    );
    this.toggleModal();

  }

  openUpdate(
    id: number,
    name: string,
    unitPrice: bigint,
    description: string,
    brand: BrandsModel,
    platform: PlatformsModel
  ) {
    this.updateModal = true;
    this.productId = id;
    this.updateForm.controls.name.setValue(name);
    this.updateForm.controls.unitPrice.setValue(unitPrice);
    this.updateForm.controls.description.patchValue(description);
    this.updateForm.controls.brand.patchValue(brand);
    this.updateForm.controls.platform.patchValue(platform);
  }

  onUpdate() {
    const updatePayload = {
      id: this.productId,
      name: this.updateForm.controls.name.value,
      unitPrice: this.updateForm.controls.unitPrice.value,
      description: this.updateForm.controls.description.value,
      platform: this.updateForm.controls.platform.value,
      brand: this.updateForm.controls.brand.value
    };

    this.productsService.updateProduct(updatePayload, this.productId).subscribe(
      response => {
        if (this.selectedFile2) {
          const payload = new FormData();
          payload.append('productId', this.productId.toString());
          payload.append('files', this.selectedFile2, this.selectedFile2.name);
          this.productsService.uploadFiles(payload).subscribe(res => {
            this.getProductsPaged();
            this.insertModal = false;
          });
        } else {
          this.getProductsPaged();
        }

        this.insertModal = false;
        this.productsForm.reset();
        this.fileForm.reset();
      },
      (err: HttpErrorResponse) => {
      });
    this.closeUpdateModal();

  }

  onFileSelected2(event) {
    this.selectedFile2 = event.target.files[0];
  }

  openInsert() {
    this.productsForm.reset();
    this.fileForm.reset();
    this.insertModal = true;
  }

  closeUpdateModal() {
    this.updateModal = !this.updateModal;
    this.updateForm.reset();
    this.fileForm.reset();
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
