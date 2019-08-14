import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-publisher-dropdown',
  templateUrl: './publisher-dropdown.component.html',
  styleUrls: ['./publisher-dropdown.component.scss']
})
export class PublisherDropdownComponent implements OnInit {

  topSixPublishers = [
    {
      id: 1,
      name: 'Activision',
      imageSrc : 'assets/img/activision-dd.png'
    },
    {
      id: 2,
      name: 'Rockstar Games',
      imageSrc : 'assets/img/rockstar-dd.png'
    },
    {
      id: 3,
      name: 'Electronic Arts',
      imageSrc : 'assets/img/ea-dd.png'
    },
    {
      id: 4,
      name: 'Netherrealm Studios',
      imageSrc : 'assets/img/netherrealm-dd.png'
    },
    {
      id: 5,
      name: 'Ubisoft',
      imageSrc : 'assets/img/ubisoft-dd.png'
    },
    {
      id: 6,
      name: 'Sega',
      imageSrc : 'assets/img/sega-dd.png'
    },


  ];



  constructor() { }

  ngOnInit() {
  }

}
