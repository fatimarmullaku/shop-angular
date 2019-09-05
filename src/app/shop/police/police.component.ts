import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-police',
  templateUrl: './police.component.html',
  styleUrls: ['./police.component.scss']
})
export class PoliceComponent implements OnInit {

  imageSrc: 'assets/img/police.jpg';

  constructor() { }

  ngOnInit() {
  }

}
