import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { Cookie } from 'ng2-cookies';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-all',
  templateUrl: './search-all.component.html',
  styleUrls: ['./search-all.component.css']
})
export class SearchAllComponent implements OnInit {

  public currentUser: any
  public authToken: any
  public issueDetails: any
  public issueCount: any
  public issueStatus: any
  public search:string;
  public pageValue: Number= 0

  constructor(public _http: HttpService, private toastr: ToastrManager, public router: Router) {
    this.currentUser = this._http.getUserInfoFromLocalStorage()
    this.authToken = Cookie.get('authToken')
    this.getAllIssue()
   }

  ngOnInit() {
  }

  public getAllIssue: any =()=>{
    this._http.getAllIssue(this.authToken, this.pageValue).subscribe(
      (apiResponse)=>{
        if(apiResponse.status === 200){
          this.issueDetails = apiResponse.data
          // looping through the status object
          for(let issue of apiResponse.data){
            let status = issue.status
            //condition to find the current status of the issue
            if(status.open == true){
              this.issueStatus = "Open"
            } else if(status.inTest == true){
              this.issueStatus = "InTest"
            } else if(status.inProgress == true){
              this.issueStatus = "InProgress"
            }else if(status.backlog == true){
              this.issueStatus = "Backlog"
            } else {
              this.issueStatus = "Closed"
            }
             /// end condition
          } // end loop for status
        } else {
          this.issueStatus = apiResponse.message
        }
      },
      (err)=>{
        console.log(err)
      }
    )
  } // end get get current user created Issues

  public logoutFunction: any =()=>{
    this._http.logoutFunction(Cookie.get('authToken'), this.currentUser.userId).subscribe(
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

  public deleteIssue: any = (issueId)=>{
    this._http.deleteParticularIssue(this.authToken, this.currentUser.userId, issueId).subscribe(
      (apiResponse)=>{
        if(apiResponse === 200){
          this.toastr.successToastr("Issue Deleted Succesfully")
          setTimeout(()=>{
            this.router.navigate(['/dashboard'])
          }, 2000)
        } else {
          this.toastr.warningToastr(apiResponse.message)
        }
      },
      (err)=>{
        console.log(err)
        this.toastr.errorToastr(`Some error occured`)
      }
    )
  } // end delete issue
}
