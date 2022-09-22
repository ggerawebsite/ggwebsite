import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { HeroService } from '../../hero.service';
import Swal from 'sweetalert2';
import data from '../../../assets/JSON/countries.json';



@Component({
  selector: 'app-make-me-pro',
  templateUrl: './make-me-pro.component.html',
  styleUrls: ['./make-me-pro.component.scss']
})
export class MakeMeProComponent implements OnInit {

  constructor(
    private router: Router,
    private _heroService: HeroService,
    public _auth: HeroService,
    private activated: ActivatedRoute
  ) { }

  countrys: any = data


  modal: boolean = false
  countryFlag: boolean = false
  submitFlag: boolean = false


  isLoggedin: boolean = false;
  otp: boolean = false
  discordFlag: boolean = false
  URLid: any;

// login

PInfoForm: any = new FormGroup({
  'game': new FormControl(''),
  'kills':new FormControl(''),
  'kd':new FormControl(''),
  'wins':new FormControl(''),
})

countryForm: any = new FormGroup({
  'country': new FormControl('')

})

phase2Form: any = new FormGroup({
  'game': new FormControl(''),
  'platform': new FormControl(''),
  'wins': new FormControl(''),
  'kills': new FormControl(''),
  'kd': new FormControl('')

})




  ngOnInit(): void {
  }


  country(){

    let CountryData = this.countryForm.value;

    setTimeout(()=>{
      this.countryFlag=true;
    },500)
  }

  phase2(){
    setTimeout(()=>{
      this.submitFlag=true;
    },500)
  }

}
