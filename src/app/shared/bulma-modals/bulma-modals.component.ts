import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bulma-modals',
  templateUrl: './bulma-modals.component.html',
  styleUrls: ['./bulma-modals.component.scss']
})
export class BulmaModalsComponent implements OnInit {

  showModal: boolean = false;
  constructor() { }

  ngOnInit() {
  }

}
