import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-platforms',
  templateUrl: './platforms.component.html'
})
export class PlatformsComponent implements OnInit {
  public example: any;

  constructor() { }

  ngOnInit() {
    this.example = "something";
  }

}
