import { Component, OnInit } from '@angular/core';
import { HeroService } from 'src/app/hero.service';

@Component({
  selector: 'app-underconstruction',
  templateUrl: './underconstruction.component.html',
  styleUrls: ['./underconstruction.component.scss']
})
export class UnderconstructionComponent implements OnInit {

  constructor(public _auth : HeroService) { }

  ngOnInit(): void {
  }

}
