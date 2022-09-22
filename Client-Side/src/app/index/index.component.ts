import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    //console.log('sss')
    window.location.href='http://ec2-3-132-235-255.us-east-2.compute.amazonaws.com/'
  }

}
