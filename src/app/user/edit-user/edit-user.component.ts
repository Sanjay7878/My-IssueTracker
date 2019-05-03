import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { Cookie } from 'ng2-cookies';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  public currentUser: any
  public currentUserId: any
  public authToken: any
  public firstName: String
  public lastName: String
  public dob: any
  public companyName: String
  public role: String
  public mobileNumber: Number
  public email: String

  
  constructor(public _http: HttpService, private toastr: ToastrManager, public router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
    this.authToken = Cookie.get('authToken')
    this.currentUserId = this._route.snapshot.paramMap.get('userId')
    this.getCurrentUserInfo()
  }
  
  public getCurrentUserInfo: any = ()=>{
    this._http.getSingleUserDetails(this.authToken, this.currentUserId).subscribe(
      (apiResponse)=>{
        if(apiResponse.status === 200){
          this.currentUser = apiResponse.data
        } else {
          console.log(apiResponse.message)
        }
      },
      (err)=>{
        console.log(err)
      }
    )
  } // end get current user info
  
  public editFunction: any = () =>{
    let data = {
      firstName: this.currentUser.firstName,
      lastName: this.currentUser.lastName,
      dob: this.currentUser.dob,
      companyName: this.currentUser.companyName,
      role: this.currentUser.role,
      mobileNumber: this.currentUser.mobileNumber,
      email: this.currentUser.email,
      password: this.currentUser.password
    }

    this._http.editUserDetails(this.authToken, this.currentUserId, data).subscribe(
      (apiResponse)=>{
        if(apiResponse.status === 200){
          this.toastr.successToastr('Details Edited Successfully')
          setTimeout(()=>{
            this._http.setUserInfoToLocalStorage(data)
            this.router.navigate(['/user-info'])
          }, 1500)
        } else {
          this.toastr.warningToastr(apiResponse.message)
        }
      },
      (err)=>{
        console.log(err)
        this.toastr.errorToastr(`Some Error Occured`)
      }
    )
  } // end edit function

  public logoutFunction: any =()=>{
    this._http.logoutFunction(Cookie.get('authToken'), this.currentUserId).subscribe(
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
