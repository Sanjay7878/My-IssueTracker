import { Injectable } from '@angular/core';

import { HttpClient, HttpParams, HttpErrorResponse} from '@angular/common/http'
import { Observable } from 'rxjs'



@Injectable({
  providedIn: 'root'
})
export class HttpService {

  public url = "http://trackerapi.sanjayinfotechy.com/api/v1"

  constructor(public http: HttpClient) { }
  
  /* 
  *
  ***** User Related Http calls**********
  *
  */
  public signupFunction(data): Observable<any>{

    let params = new HttpParams()
      .set('firstName', data.firstName)
      .set('lastName', data.lastName)
      .set('dob', data.dob)
      .set('companyName', data.companyName)
      .set('role', data.role)
      .set('mobileNumber', data.mobileNumber)
      .set('email', data.email)
      .set('password', data.password)
      .set('location', data.location)
      
    return this.http.post(`${this.url}/user/signup`, params)
  }// end sign in function

  public loginFunction(data): Observable<any>{
    const params = new HttpParams()
      .set('email', data.email)
      .set('password', data.password)
    
      return this.http.post(`${this.url}/user/login`, params)
  } // end login function

  //function to logout the user from web page
  public logoutFunction(authToken, userId): Observable<any>{
    return this.http.post(`${this.url}/user/logout?authToken=${authToken}`, userId)
  } // end logout function

  public editUserDetails(authToken, userId, data): Observable<any>{

    const params = new HttpParams()
      .set('authToken', authToken)
      .set('firstName', data.firstName)
      .set('lastName', data.lastName)
      .set('dob', data.dob)
      .set('companyName', data.companyName)
      .set('role', data.role)
      .set('mobileNumber', data.mobileNumber)
      .set('email', data.email)
      .set('password', data.password)

    return this.http.put(`${this.url}/user/${userId}/edit`, params)
  } // end edit user details

  public deleteUser(authToken, userId): Observable<any>{

    const params = new HttpParams()
      .set('authToken', authToken)
      .set('userId', userId)

    return this.http.post(`${this.url}/user/:userId/delete`, params)
  } // end get user Details

  public getSingleUserDetails(authToken, userId): Observable<any>{

    return this.http.get(`${this.url}/user/${userId}/get?authToken=${authToken}`)
  } // end get single user info

  public getAlluserDetails(authToken): Observable<any>{
    return this.http.get(`${this.url}/user/get/all?authToken=${authToken}`, )
  } // end get all user details

  public setUserInfoToLocalStorage: any = (data) =>{
    localStorage.setItem('userInfo', JSON.stringify(data))
  } // end SET USER INFO TO LOCAL STORAGE

  public getUserInfoFromLocalStorage: any = () =>{
    return JSON.parse(localStorage.getItem('userInfo'))
  } // end get user info from local storage

  public deleteUserInfoFromLocalStorage: any = () =>{
    localStorage.removeItem(this.getUserInfoFromLocalStorage())
  } // end delete user info from local stoarage


  /* 
  *
  ***** Issue Records Related Http calls**********
  *
  */


  public createIssue(authToken, data): Observable<any> {
    const fd = new FormData()
      fd.set('userId', data.userId)
      fd.set('title', data.title)
      fd.set('description', data.description)
      fd.set('issueLocation', data.issueLocation)
      fd.set('issueType', data.issueType)
      fd.set('assignee', data.assignee)
      fd.append('screenshots', data.screenshots)

      return this.http.post(`${this.url}/records/create/issue?authToken=${authToken}`, fd)
  } // end create new issue

  public getCurrentUserIssue(authToken, fullName): Observable<any>{
    return this.http.get(`${this.url}/records/all/user/issues?authToken=${authToken}&fullName=${fullName}`)
  } // end get current user created issues

  public getSingleIssue(authToken, issueId): Observable<any>{
    return this.http.get(`${this.url}/records/get/${issueId}/issue?authToken=${authToken}`)
  } // end get single issue

  public getAllIssue(authToken, skip): Observable<any>{
    return this.http.get(`${this.url}/records/get/pagination?authToken=${authToken}&skip=${skip}`)
  } // end get all issues

  public deleteParticularIssue(authToken, userId, issueId): Observable<any>{

    const params = new HttpParams()
      .set('authToken', authToken)
      .set('userId', userId)
      .set('issueId', issueId)

    return this.http.post(`${this.url}/records/delete/issue`, params)
  } // end delete particular Issue

  public editParticularIssue(authToken, issueId, data): Observable<any> {
    const params = new HttpParams()
      .set('authToken', authToken)
      .set('issueId', issueId)
      .set('title', data.title)
      .set('description', data.description)
      .set('issueLocation', data.issueLocation)
      .set('issueType', data.issueType)
      .set('assignee', data.assignee)
      .set('watchers', data.watchers)
      .set('screenshots', data.screenshots)
    return this.http.put(`${this.url}/records/edit/user/issue`, params)
  } // end edit poarticular issue

  ///comments data requests
  public getCurrentIssuecomments(authToken, issueId, skip): Observable<any>{
    return this.http.get(`${this.url}/comments/get/all?authToken=${authToken}&issueId=${issueId}`, skip)
  } // end get current issue comments
/*
*
*handling http error
*
*/

  //handling error
  private errorHandler(err: HttpErrorResponse){
    let errorMessage = ''
    if(err.error instanceof Error){
      errorMessage = `An error occurred ${err.error.message}`
    } else {
      errorMessage = `Server Returned code: ${err.status} and error message is ${err.message}`
    }

    console.log(errorMessage)
    return Observable.throw(errorMessage)
  } // end error handler

}
