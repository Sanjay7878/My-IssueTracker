import { Injectable } from '@angular/core';

import * as io from 'socket.io-client'

import {Observable} from 'rxjs'
import { Cookie } from 'ng2-cookies'
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { HttpErrorResponse, HttpParams } from '@angular/common/http' 

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  public url = "http://trackerapi.sanjayinfotechy.com"
  private socket
  public authToken: any

  constructor(public _http: HttpClient) {
    // connection being created
    this.socket = io(this.url)
    this.authToken = Cookie.get('authToken')
  }

  public verifyUser: any = () =>{
    return Observable.create((observer)=>{
      this.socket.on('verifyUser', (data)=>{
        observer.next(data)
      })
    })
  } // end on verify user

  public setUser: any = (authToken)=>{
    this.socket.emit('set-user', authToken)
  } // end set user emit

  public postComment: any = (commentDetails) =>{
    this.socket.emit('new-comment', commentDetails)
  } // end on new-comment
  
  public disconnectSocket: any = () =>{
    return Observable.create((observer)=>{
      this.socket.on('disconnect', ()=>{
        observer.next()
      })
    })
  } // end disconnect socket

  public deleteComments(authToken, commentId): Observable<any>{
    const params = new HttpParams()
      .set('authToken', authToken)
      .set('commentId', commentId)

    return this._http.post(`${this.url}/api/v1/comments/delete`, params)
  } // end delete comment

  
  public watchersList: any =() =>{
    return Observable.create((observer)=>{
      this.socket.on('watcher-user-list', (watcherList)=>{
        observer.next(watcherList)
      })
    })
  } // end wathchers list

}
