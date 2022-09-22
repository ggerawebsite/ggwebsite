import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeroService } from 'src/app/hero.service';
import { HttpClient } from '@angular/common/http';

import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from "@angular/forms";
import Swal from 'sweetalert2';
import data from '../../../assets/JSON/countries.json';
import { UploadService } from 'src/app/services/upload.service';
import { response } from 'express';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [UploadService]
})
export class ProfileComponent implements OnInit {

  countrys: any = data
  selectedFile = null;
  user:any

  constructor(private router: Router, private hero: HeroService, private fb: FormBuilder, private uploadService: UploadService,  public _auth:HeroService) { }


  ProfileForm: any = new FormGroup({
    'username': new FormControl(''),
    'language': new FormControl(''),
    // 'profile_pic': new FormControl(''),
    'country': new FormControl(''),
    'email': new FormControl(''),
    'gamer': new FormControl(''),
    'gamerID': new FormControl(''),
    'wr': new FormControl(''),
    'discord_id': new FormControl(''),
    'channel_name': new FormControl(''),
    'kd': new FormControl(''),
    'elo': new FormControl(''),
    'winrate': new FormControl(''),
    'kills': new FormControl(''),
    'wins': new FormControl(''),
    'platform': new FormControl(''),
    // 'account_name': new FormControl(''),
    // 'account_number': new FormControl(''),
    // 'bank_name': new FormControl(''),
    'flawless': new FormControl(''),
    'pro_cost': new FormControl(''),
    'vip_cost': new FormControl(''),
    'about': new FormControl('')
  })


  AccountForm: any = new FormGroup({
  
    'account_name': new FormControl(''),
    'account_number': new FormControl(''),
    'bank_name': new FormControl(''),
    'iban_code': new FormControl(''),
    'swift_code': new FormControl(''),

  })

  ngOnInit(): void {

    this.userData();
    this.getUserDATA();
  }

  getUserDATA() {
    let email = this.hero.getEmail()

    this.hero.getUserDetail(email)
      .subscribe(res => {
        this.ProfileForm = this.fb.group({


          'username': res.username,
          'profile_pic': res.profile_pic,
          'country': res.country,
          'language': res.language,
          'gamer': res.gamer,
          'gamerID': res.gamerID,
          'email': res.email,
          'wr': res.wr,
          'discord_id': res.discord_id,
          'channel_name': res.channel_name,
          'kd': res.kd,
          'elo': res.elo,
          'winrate': res.winrate,
          'kills': res.kills,
          'wins': res.wins,
          'platform': res.platform,        
          'flawless': res.flawless,
          'pro_cost': 12,
          'vip_cost': res.vip_cost,
          'about': res.about
        })

        this.AccountForm = this.fb.group({

          'account_name': res.account_name,
          'account_number': res.account_number,
          'bank_name': res.bank_name,
          'iban_code': res.iban_code,
          'swift_code': res.swift_code,
        })
      })

  }




  profile() {
    let email = this.hero.getEmail();
    let profileUpdate = this.ProfileForm.value

    this.hero.updateProfile(profileUpdate, email)
      .subscribe(
        {
          next: (res) => {
            if (res) {

              Swal.fire({
                icon: 'success',
                title: 'Updated successfully',
                showConfirmButton: false,
                timer: 1500
              }).then(() => {
                if (this.hero.isNormal()) {
                  this.router.navigate(['/home-page'])

                } else {
                  this.router.navigate(['/pro-home'])

                }


              })

            }
          },
          error: (err) => {

            Swal.fire({
              icon: 'error',
              title: 'Network Error. Please try again',
              showConfirmButton: false,
              timer: 1500
            }).then(() => {
              this.router.navigate(['/login'])

            })
          }
        })


  }


  Account(){

    let email = this.hero.getEmail();
    let accountUpdate = this.AccountForm.value

    this.hero.updateProfile(accountUpdate, email)
      .subscribe(
        {
          next: (res) => {
            if (res) {

              Swal.fire({
                icon: 'success',
                title: 'Updated successfully',
                showConfirmButton: false,
                timer: 1500
              }).then(() => {
                if (this.hero.isNormal()) {
                  this.router.navigate(['/home-page'])

                } else {
                  this.router.navigate(['/pro-home'])

                }


              })

            }
          },
          error: (err) => {

            Swal.fire({
              icon: 'error',
              title: 'Network Error. Please try again',
              showConfirmButton: false,
              timer: 1500
            }).then(() => {
              this.router.navigate(['/login'])

            })
          }
        })

  }


  onFileSelected(event) {
    const file:File = event.target.files[0];
    if (file) {
      console.log(file);
      this.selectedFile=file;
    }
  }
  uploadImage(){
    let uploadResponse = null;
    if(this.selectedFile){
      const data = new FormData();
      data.append('file',this.selectedFile);
      data.append('upload_preset','newGamingApp');
      data.append('cloud_name','achums007');
      this.uploadService.uploadImageToCloudinary(data).subscribe((response) =>{
        if(response){
          uploadResponse= response;
          console.log(response);
          this.editProfile(response);
        }
      });
    } 
  }
  editProfile(response){
    console.log(response.secure_url)
    this.ProfileForm.value.profile_pic = response.secure_url ;
    this.profile();
    
  }
  userData() {
    if(this.hero.getEmail()){
      let email = this.hero.getEmail()
      this.hero.getUserDetail(email).
        subscribe(res => {
          this.user = res
         
        })
    }
  }
}
