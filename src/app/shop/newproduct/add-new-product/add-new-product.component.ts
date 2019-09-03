import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html'
})
export class AddNewProductComponent implements OnInit {

  constructor() { }

  url = '';
  fileChosen = '';

  ngOnInit() {
  }
  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = reader.result.toString();
      };
    }
    this.fileChosen = 'none';
  }
}
