import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http.service';

import { Cookie } from 'ng2-cookies'
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})

export class UserInfoComponent implements OnInit {

  public userName: String
  public authToken: String
  public currentUser: any

  constructor(public _http: HttpService, private toastr: ToastrManager, public router: Router) { }

  ngOnInit() {
    this.currentUser = this._http.getUserInfoFromLocalStorage()
    this.userName = Cookie.get('fullName')
    this.authToken = Cookie.get('authToken')
  }

  public logoutFunction: any =()=>{
    this._http.logoutFunction(Cookie.get('authToken'), this.userName).subscribe(
      (apiResponse)=>{
        if(apiResponse.status === 200){
          Cookie.deleteAll()
          this.toastr.infoToastr("You Have Successfully Logged Out")
          this._http.deleteUserInfoFromLocalStorage()
          setTimeout(()=>{
            this.router.navigate(['/home'])
          }, 1500)
        } else {
          this.toastr.warningToastr(apiResponse.message)
        }
      },
      (err)=>{
        console.log(err.error.message)
        this.toastr.errorToastr(`Some Error Occured due to ${err.error.message}`)
      }
    )
  } // end logout function

}
