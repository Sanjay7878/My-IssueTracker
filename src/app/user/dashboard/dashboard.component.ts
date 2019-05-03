import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router, ActivatedRoute } from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { SocketService } from 'src/app/socket.service';


@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit{

  public currentUser: any
  public userName: String
  public authToken: any
  public issueDetails: any
  public issueStatus: any
  public issueCount = []
  constructor(public _http: HttpService, private toastr: ToastrManager, public router: Router, public route: ActivatedRoute, public socket: SocketService) { }

  ngOnInit() {
    this.currentUser = this._http.getUserInfoFromLocalStorage()
    this.userName = this.currentUser.firstName+' '+this.currentUser.lastName
    this.authToken = Cookie.get('authToken')
    this.getCurrentUserCreatedIssues()
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

  public getCurrentUserCreatedIssues: any =()=>{
    this._http.getCurrentUserIssue(this.authToken, this.userName).subscribe(
      (apiResponse)=>{
        if(apiResponse.status === 200){
          this.issueDetails = apiResponse.data
          for(let issue in this.issueDetails){
            this.issueCount.push(issue) 
          }
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

  public verifyUserConfirmation: any = () =>{
    this.socket.verifyUser().subscribe(
      (data)=>{
        this.socket.setUser(this.authToken)
      } 
    )
  } // end verify user confirmation
  
}
