import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import html2canvas from 'html2canvas';
import {HttpErrorResponse} from '@angular/common/http';
import {BrandsModel} from './brands.model';
import {BrandsService} from './brands.service';
import * as jspdf from 'jspdf';

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
      id: [''],
      name: [''],
      recordStatus: [''],
      createDateTime: [''],
      updateDateTime: [''],
      deletedDateTime: [''],
      description: [''],
      version: [''],
    });

    this.updateForm = this.formBuilder.group({
      name: [''],
      recordStatus: [''],
      updateDateTime: [],
      deletedDateTime: [],
      description: [''],
      version: [],
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
    console.log('insert is called');
    this.insertModal = true;
    console.log('from open insert', this.insertModal);
  }

  openUpdate(
    id,
    name,
    recordStatus,
    updateDateTime,
    deletedDateTime,
    description,
    version: number) {
    this.bid = id;
    this.updateModal = true;
    this.updateForm.controls.name.setValue(name);
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
