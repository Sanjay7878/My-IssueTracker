import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from '@angular/router';

import {Cookie} from 'ng2-cookies'
import { SocketService } from 'src/app/socket.service';
import { HttpClient, HttpEventType, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-create-record',
  templateUrl: './create-record.component.html',
  styleUrls: ['./create-record.component.css']
})
export class CreateRecordComponent implements OnInit {

  
  public currentUser: any
  public authToken: any
  public title: String
  public description: any
  public issueLocation: String
  public issueType: String
  public assignee: any
  public possibleIssueType = [  '404 Not Found', 'Elements Does Not Work', 'Missing Elemenst/Features', 'Wrong Functionality', 'Other Issues']

  public screenshots: File
  public allUsers = []
  public userName: String
  public watchers: any = []
  public fileName: String
  public screenshotsUrl = "http://trackerapi.sanjayinfotechy.com/appController/screenshots/"


  constructor(
    public _http: HttpService, 
    private toastr: ToastrManager, 
    public router: Router, 
    public socket: SocketService,
    public http: HttpClient) { }


  ngOnInit() {
    this.currentUser = this._http.getUserInfoFromLocalStorage()
    this.authToken = Cookie.get('authToken')
    this.userName = Cookie.get('fullName')
    this.getAllUsers()
  }
  
  onFileSelected(event){
    this.screenshots = event.target.files[0]
  }

  onUpload(){

    const fd = new FormData()
    fd.append('image', this.screenshots, this.screenshots.name)

    this.http.post(`http://trackerapi.sanjayinfotechy.com/api/v1/records/create/issue`, fd,
      { reportProgress: true, observe: 'events'}
    ).subscribe(
      (events)=>{
        console.log(events)
        if(events.type === HttpEventType.UploadProgress){
          console.log('upload Progress: '+ Math.round(events.loaded / events.total * 100) + '%')
        }else if(events.type === HttpEventType.Response){
          console.log(events)
        }
      }
    )
  }



  public createNewIssue: any = ()=>{
    if(!this.title){
      this.toastr.infoToastr("Please provide a issue title")
    } else if(!this.description){
      this.toastr.infoToastr("Provide the description of the issue")
    } else if(!this.issueLocation){
      this.toastr.infoToastr("Mention the issue location")
    } else if(!this.issueType){
      this.toastr.infoToastr("Select the type of issue occured")
    }else {
      let data = {
        title: this.title,
        description: this.description,
        issueLocation: this.issueLocation,
        issueType: this.issueType,
        userId: this.currentUser.userId,
        assignee: this.assignee,
        screenshots: this.screenshots
      }

      this._http.createIssue(this.authToken, data).subscribe(
        (apiResponse)=>{
          if(apiResponse.status === 200){
            console.log(apiResponse)
            this.toastr.successToastr("New Issue/Bug Created")
            setTimeout(()=>{
              this.router.navigate([`/view/${apiResponse.data.issueId}`, ])
            }, 2000)
          } else{
            console.log(apiResponse)
            this.toastr.warningToastr(apiResponse.message)
          }
        }, 
        (err)=>{
          console.log(err)
          this.toastr.errorToastr("Failed to Create Due to Some Error")
        }
      )
    }
  } // end create new issue

  public getAllUsers: any = () =>{
    this._http.getAlluserDetails(Cookie.get('authToken')).subscribe(
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
