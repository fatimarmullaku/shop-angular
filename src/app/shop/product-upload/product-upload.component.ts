import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {RestService} from '../../shared/services/rest.service';
import {HttpClient} from '@angular/common/http';
import {ENDPOINTS} from '../../shared/constants/api.constants';

@Component({
  selector: 'app-product-upload',
  templateUrl: './product-upload.component.html',
})
export class ProductUploadComponent implements OnInit {

  myUrl = '';
  productForm: FormGroup;
  fileChosen: File;

  constructor(private formBuilder: FormBuilder,
              private restService: RestService,
              private httpClient: HttpClient) {
  }

  get form() {
    return this.productForm.controls;
  }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      name: new FormControl(''),
      unitPrice: new FormControl(''),
    });
  }

  onSelectFile(event: any) {
    event.preventDefault();
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.myUrl = reader.result.toString();
      };

    }
    this.fileChosen = event.target.files[0];
  }

  uploadProduct() {
    const formData = new FormData();

    const payload = {
      name: this.form.name.value,
      unitPrice: this.form.unitPrice.value,
    };
    const stringifiedPayload = JSON.stringify(payload);
    formData.append('files', this.fileChosen);
    formData.append('data', stringifiedPayload);
    formData.forEach(value => {
    });
    this.httpClient.post<any>(ENDPOINTS.products.getAll + '/withimage', formData).subscribe((res) => {
      },
      (error) => {
        console.log('ERROR', error);
      });
  }
}
