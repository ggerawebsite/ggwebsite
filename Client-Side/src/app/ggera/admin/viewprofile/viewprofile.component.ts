import { Component, OnInit } from '@angular/core';
import { Router ,ActivatedRoute} from '@angular/router';
import { AdminService } from 'src/app/common/service/admin.service';
import { HeroService } from 'src/app/hero.service';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from "@angular/forms";
import Swal from 'sweetalert2';
import data from '../../../../assets/JSON/countries.json';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-viewprofile',
  templateUrl: './viewprofile.component.html',
  styleUrls: ['./viewprofile.component.scss'],
  providers: [UploadService]
})
export class ViewprofileComponent implements OnInit {
user:any

id:any
countrys: any = data
selectedFile = null;
  constructor(private route: ActivatedRoute,private router:Router,private admin:AdminService,private hero: HeroService, private fb: FormBuilder, private uploadService: UploadService) { }

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
    'flawless': new FormControl(''),
    'pro_cost': new FormControl(''),
    'vip_cost': new FormControl(''),
    'about': new FormControl(''),
    'createdAt': new FormControl('')
  })
  ngOnInit(): void {
    
      this.userData();
      this.getUserDATA();
      console.log('user',this.user)    
  }
  getUserDATA() {
      var id=this.route.snapshot.paramMap.get('userid');
      this.admin.getProUser(id)
      .subscribe(res=>{
          console.log('response',res)
          this.ProfileForm=this.fb.group({
          'username': res[0].username,
          'profile_pic': res[0].profile_pic,
          'country': res[0].country,
          'language': res[0].language,
          'gamer': res[0].gamer,
          'gamerID': res[0].gamerID,
          'email': res[0].email,
          'wr': res[0].wr,
          'discord_id': res[0].discord_id,
          'channel_name': res[0].channel_name,
          'kd': res[0].kd,
          'elo': res[0].elo,
          'winrate': res[0].winrate,
          'kills': res[0].kills,
          'wins': res[0].wins,
          'platform': res[0].platform,        
          'flawless': res[0].flawless,
          'pro_cost': res[0].pro_cost,
          'vip_cost': res[0].vip_cost,
          'about': res[0].about,
          'createdAt': res[0].createdAt
        })
        console.log('user',this.ProfileForm.value.createdAt)  
      })

  }




  profile() {
    // let email = this.hero.getEmail();
    var id=this.route.snapshot.paramMap.get('userid');
    let profileUpdate = this.ProfileForm.value

    this.admin.updateProfile(profileUpdate, id)
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
                  this.router.navigate(['/admin/pro-list'])

                } else {
                  this.router.navigate(['/admin/pro-list'])

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
