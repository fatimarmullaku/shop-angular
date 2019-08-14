import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-additional-information',
  templateUrl: './additional-information.component.html'
})
export class AdditionalInformationComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }
  //
  // doStuff() {
  //   const addaddress = document.getElementById('addaddress');
  //   if (addaddress) {
  //     addaddress.addEventListener('click',  function (e) {
  //       e.preventDefault();
  //       const boxes = document.getElementById('box-address');
  //       const clone = boxes.firstElementChild.cloneNode(true);
  //       boxes.appendChild(clone);
  //     });
  //   }
  //
  //   const addphone = document.getElementById('addphone');
  //   if (addphone) {
  //     addphone.addEventListener('click', function(e) {
  //       e.preventDefault();
  //       const boxes = document.getElementById('box-phone');
  //       const clone = boxes.firstElementChild.cloneNode(true);
  //       boxes.appendChild(clone);
  //     });
  //  }
  // }
}
