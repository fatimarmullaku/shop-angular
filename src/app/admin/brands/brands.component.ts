import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {BrandsModel} from './brands.model';
import {BrandsService} from "../../shared/services/brands.service";


@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {
  deleteModal = false;
  updateModal = false;
  insertModal = false;
  filter: string;
  brandsList: BrandsModel[];
  form: FormGroup;
  bid: number;
  updateForm: FormGroup;


  constructor(private brandsService: BrandsService,
              private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.brandsService.getAllBrands().subscribe((data: any) => {
      this.brandsList = data;
      console.log(this.brandsList);
    });


    this.form = this.formBuilder.group({

      name: [''],
      comment: [''],
    });

    this.updateForm = this.formBuilder.group({
      name: [''],
      recordStatus: [''],
      updateDateTime: [],
      deletedDateTime: [],
      comment: [''],
      version: [],
    });
  }



  onSubmit() {
    const values = this.form.value;
    this.brandsService.registerBrand(values).subscribe(
      get => {
        this.brandsService.getAllBrands().subscribe((data: any) => {
          this.brandsList = data;
        });
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
    this.insertModal = false;
  }


  onDelete() {
    this.brandsService.deleteBrand(this.bid).subscribe(
      get => {
        this.brandsService.getAllBrands().subscribe((data: any) => {
          this.brandsList = data;
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
    console.log(values);
    this.brandsService.updateBrand(values, this.bid).subscribe(
      get => {
        this.brandsService.getAllBrands().subscribe((data: any) => {
          this.brandsList = data;
        });
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
    this.updateModal = false;
  }

  openInsert() {
    this.insertModal = true;
  }

  openUpdate(
    id,
    name,
    recordStatus,
    updateDateTime,
    deletedDateTime,
    comment,
    version: number) {
    this.bid = id;
    this.updateModal = true;
    this.updateForm.controls.name.setValue(name);
    this.updateForm.controls.recordStatus.setValue(recordStatus);
    this.updateForm.controls.updateDateTime.setValue(updateDateTime);
    this.updateForm.controls.deletedDateTime.setValue(deletedDateTime);
    this.updateForm.controls.comment.setValue(comment);
    this.updateForm.controls.version.setValue(version);

  }

  closeUpdateModal() {
    this.updateModal = !this.updateModal;
    this.updateForm.reset();
  }

  closeInsertModal() {
    this.insertModal = !this.insertModal;
    this.form.reset();
  }

  toggleModal() {
    this.deleteModal = !this.deleteModal;
  }

  openDelete(bid) {
    this.deleteModal = true;
    this.bid = bid;
  }
}
