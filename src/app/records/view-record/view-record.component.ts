import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/http.service';
import { Cookie } from 'ng2-cookies';
import { ToastrManager } from 'ng6-toastr-notifications';
import { SocketService } from 'src/app/socket.service';

@Component({
  selector: 'app-view-record',
  templateUrl: './view-record.component.html',
  styleUrls: ['./view-record.component.css']
})
export class ViewRecordComponent implements OnInit {

  public currentUser: any
  public currentIssueId: any
  public currentIssue: any
  public issueStatus: any
  public authToken: any

  public watchersList: any = []
  public comment: any
  public userComment: String
  public currentComments: any = []
  public commentsPageValue: Number = 0
  public screenshot: File
  public allStatus : any = []

  constructor(public _route: ActivatedRoute, 
    public _http: HttpService, 
    private toastr: ToastrManager, 
    public router: Router,
    public socket: SocketService) { }

  ngOnInit() {
    this.currentIssueId = this._route.snapshot.paramMap.get('issueId')
    this.currentUser = this._http.getUserInfoFromLocalStorage()
    this.authToken = Cookie.get('authToken')
    this.getCurrentIssue()
    this.getAllCurrentIssueComments()
    
  }

  public getCurrentIssue: any = () =>{
    this._http.getSingleIssue(Cookie.get('authToken'), this.currentIssueId).subscribe(
      (apiResponse)=>{
        if(apiResponse.status === 200){
          this.currentIssue = apiResponse.data
          this.allStatus = this.currentIssue.status
            //condition to find the current status of the issue
            if(this.currentIssue.status.open == true){
              this.issueStatus = "Open"
            } else if(this.currentIssue.status.inTest == true){
              this.issueStatus = "InTest"
            } else if(this.currentIssue.status.inProgress == true){
              this.issueStatus = "InProgress"
            }else if(this.currentIssue.status.backlog == true){
              this.issueStatus = "Backlog"
            } else {
              this.issueStatus = "Closed"
            }
             /// end condition
        } else {
          this.toastr.infoToastr(`Currently there are ${apiResponse.message}` )
        }
      }, 
      (err)=>{
        console.log(err)
      }
    )
  } // end get current issue

  public deleteIssue: any = ()=>{
    this._http.deleteParticularIssue(Cookie.get('authToken'), this.currentUser.userId, this.currentIssueId).subscribe(
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

  public logoutFunction: any =()=>{
    this._http.logoutFunction(Cookie.get('authToken'), this.currentIssueId).subscribe(
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

  public sendMessageUsingKeyPress: any = (event: any) =>{
    if(event.KeyCode === 13){ // 13 is the key code for enter
      this.postComment()
    }
  } // end send message using keypress

  public getAllCurrentIssueComments: any = () =>{
    this._http.getCurrentIssuecomments(this.authToken, this.currentIssueId, this.commentsPageValue).subscribe(
      (apiResponse)=>{
        if(apiResponse.status === 200){
          this.currentComments = apiResponse.data
        }else {
          console.log(apiResponse.message)
        }
      },
      (err)=>{
        console.log(err)
      }
    )
  } // end get all current issue comments

  public postComment: any = () =>{
    if(this.comment){
      let userComment = {
        comment: this.comment,
        commentedBy: this.currentUser.firstName+' '+this.currentUser.lastName,
        createdOn: Date.now(),
        issueId: this.currentIssueId
      }
        this.socket.postComment(userComment)
        this.currentComments.push(userComment)
        this.watchersList.push(Cookie.get('fullName'))
    } else {
      this.toastr.errorToastr("Cannot post empty comments")
    }
  } // end post comment

  public deleteAComment: any = (commentId) =>{
    this.socket.deleteComments(this.authToken, commentId).subscribe(
      (apiResponse)=>{
        if(apiResponse.status === 200){
          this.toastr.successToastr("Comment Deleted")
          for(let comments of this.currentComments){
            this.currentComments.pop(comments.commentId)
          }
        } else {
          this.toastr.errorToastr(apiResponse.message)
        }
      },
      (err)=>{
        console.log(err)
      }
    )
  } // end delete a particular comment

  public addUserToWacthersList: any = () =>{
    let user = this.currentUser
    this.watchersList.push(user)
    this.toastr.infoToastr("added user as a watcher")
    this.currentIssue.watchers = this.watchersList
    this.socket.watchersList(this.watchersList)
    console.log(this.currentIssue)
  } // add the user to wacthers list


}
