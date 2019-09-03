import { Component, OnInit } from '@angular/core';
import {PlatformsService} from '../platforms/platforms.service';

@Component({
  selector: 'app-home-dashboard',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private categoriesService: PlatformsService) { }

  ngOnInit() {

  }

}
