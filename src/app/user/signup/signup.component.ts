import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http.service';

import { Router } from '@angular/router'
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(public httpService: HttpService, public router: Router, private toastr: ToastrManager) { }

  public firstName: String
  public lastName: String
  public dob: Date
  public companyName: String
  public role: String
  public mobileNumber: String
  public email: String
  public password: any
  public location: any

  ngOnInit() {
  }

  public signupFunction: any = () =>{
    if(!this.firstName){
      this.toastr.warningToastr("Please provide your first name")
    } else if(!this.lastName){
      this.toastr.warningToastr("Please provide your last name")
    }else if(!this.role){
      this.toastr.warningToastr("Please provide your role or designation")
    }else if(!this.email){
      this.toastr.warningToastr("Please provide your email address")
    }else if(!this.password){
      this.toastr.warningToastr("Please provide a password")
    } else {

      let data = {
        firstName: this.firstName,
        lastName: this.lastName,
        dob: this.dob,
        companyName: this.companyName,
        role: this.role,
        mobileNumber: this.mobileNumber,
        location: this.location,
        email: this.email,
        password: this.password
      }
      this.httpService.signupFunction(data).subscribe(
        (apiResponse)=>{
          if(apiResponse.status === 200){
            this.toastr.successToastr("User Created Successfully")
            setTimeout(()=>{
              this.router.navigate(['/login'])
            }, 2000)
          } else {
            this.toastr.errorToastr(apiResponse.message)
          }
        },
        (err)=>{
          console.log(err)
          this.toastr.errorToastr("Unable to create user. Some Error occured")
        }
      )
    }
  } // end signup function

}
