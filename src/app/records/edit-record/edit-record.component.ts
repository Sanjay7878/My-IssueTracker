import { Component, OnInit, ApplicationRef } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Cookie } from 'ng2-cookies';
import { ActivatedRoute, Router } from '@angular/router';
import { SocketService } from 'src/app/socket.service';

@Component({
  selector: 'app-edit-record',
  templateUrl: './edit-record.component.html',
  styleUrls: ['./edit-record.component.css']
})
export class EditRecordComponent implements OnInit {

  public currentIssue: any
  public currentIssueId: String
  public authToken: String
  public userName: String
  public allUsers: any = []
  public possibleIssueType = ['404 Not Found', 'Elements Does Not Work', 'Missing Elemenst/Features', 'Wrong Functionality', 'Other Issues']
  constructor(public _http: HttpService, private toastr: ToastrManager, public route: ActivatedRoute, public router: Router, public socket: SocketService) { }

  ngOnInit() {
    this.currentIssueId = this.route.snapshot.paramMap.get('issueId')
    this.authToken = Cookie.get('authToken')
    this.userName = Cookie.get('fullName')
    this.getParitcularIssue()
    this.getAllUsers()
  }

  public getParitcularIssue: any =() =>{
    this._http.getSingleIssue(this.authToken, this.currentIssueId).subscribe(
      (apiResponse)=>{
        if(apiResponse.status === 200){
          this.currentIssue = apiResponse.data
        } else {
          console.log(apiResponse.message)
        }
      },
      (err)=>{
        console.log(err)
      }
    )
  } // end get particular issue

  public editParticularIssue:any = () =>{
    let data = {
      title: this.currentIssue.title,
      description: this.currentIssue.description,
      issueLocation: this.currentIssue.issueLocation,
      issueType: this.currentIssue.issueType,
      assignee: this.currentIssue.assignee,
      watchers: this.currentIssue.watchers.push(Cookie.get('fullName')),
      screenshots: this.currentIssue.screenshots
    }
    this._http.editParticularIssue(this.authToken, this.currentIssueId, data).subscribe(
      (apiResponse)=>{
        if(apiResponse.status === 200){
          this.toastr.successToastr('Issue Details Edited')
          setTimeout(()=>{
            this.router.navigate([`view/${this.currentIssueId}`])
          }, 1500)
        } else {
          this.toastr.warningToastr(apiResponse.message)
        }
      },
      (err)=>{
        this.toastr.errorToastr("Unable to edit due to some error")
        console.log(err)
      }
    )
  } // end edit particular issue

  public getAllUsers: any = () =>{
    this._http.getAlluserDetails(this.authToken).subscribe(
      (apiResponse)=>{
        if(apiResponse.status === 200){
          let allUsers = apiResponse.data
          for(let users of allUsers){
            let userNames = users.firstName+' '+users.lastName
            this.allUsers.push(userNames)
          }
        } else {
          console.log(apiResponse.message)
          console.log("Some error")
        }
      },
      (err)=>{
        console.log(err)
      }
    )
  } // get all users

  public logoutFunction: any =()=>{
    this._http.logoutFunction(Cookie.get('authToken'), this.userName).subscribe(
      (apiResponse)=>{
        if(apiResponse.status === 200){
          Cookie.deleteAll()
          this.toastr.infoToastr("You Have Successfully Logged Out")
          this._http.deleteUserInfoFromLocalStorage()
          this.socket.disconnectSocket()
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
