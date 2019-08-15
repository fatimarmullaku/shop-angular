import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html'
})
export class AddNewProductComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  url = '';
  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = reader.result.toString();
      }
    }
  }
}
