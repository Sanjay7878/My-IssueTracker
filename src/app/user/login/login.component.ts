import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';

import { Cookie } from 'ng2-cookies'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email: String
  public password: String

  constructor(public httpService: HttpService, public router: Router, private toastr: ToastrManager) { }

  ngOnInit() {
  }

  public signinFunction: any = () =>{
    if(!this.email){
      this.toastr.warningToastr('Please Enter your email address')
    }else if(!this.password){
      this.toastr.warningToastr('Please Enter your password')
    } else {
      let data = {
        email: this.email,
        password: this.password
      }

      this.httpService.loginFunction(data).subscribe(
        (apiResponse)=>{
          if(apiResponse.status === 200){
            this.toastr.successToastr("Welcome!!")
            
            Cookie.set('authToken', apiResponse.data.authToken)
            Cookie.set('fullName', apiResponse.data.userDetails.firstName+" "+apiResponse.data.userDetails.lastName)
            Cookie.set('userId', apiResponse.data.userDetails.userId)

            this.httpService.setUserInfoToLocalStorage(apiResponse.data.userDetails)

            setTimeout(()=>{
              this.router.navigate(['/dashboard'])
            }, 2000)
          } else {
            this.toastr.errorToastr(apiResponse.message)
          }
        },
        (err)=>{
          console.log(err.error)
          this.toastr.errorToastr(`Failed to Login due to ${err.error.message}`)
        }
      )
    }
  } // end sign in function

}
