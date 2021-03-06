import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class FirebaseBackendProvider {

  apiUrl = 'http://us-central1-marinetelmatics.cloudfunctions.net';
  headers = new HttpHeaders();

  constructor(public http: HttpClient) {
    console.log('Hello FirebaseBackendProvider Provider');
  }

  login( credentials ) {
    return this.post('/login', credentials);
  }

  register( user ) {
    return this.post('/createUser', user);
  }

  registerBoat( boat, userId ) {
    boat['user_id'] = userId;
    return this.post('/createIMEI', boat);
  }

  boat( imei ) {
    return this.get('/boat?imei='+imei);
  }

  user( id ) {
    return this.get('/user?id='+id);
  }

  setLimits( boat ){
    return this.post('/boat', boat);
  }

  setMonitoredItems( boat ){
    return this.post('/boat', boat);
  }
  
  post( path, data ) {
    console.log("Post to path: " + path);
    console.dir(data);
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+path, data, { headers:this.headers })
        .subscribe(data => {
          resolve(data);
        }, err => {
          console.log(err);
          reject(err);
        });
    });
  }

  get( path ) {
    console.log("Get from path: " + path);
    return new Promise((resolve, reject) => {
      this.http.get( this.apiUrl+path, {headers: this.headers} )
        .subscribe(data => {
          resolve(data);
        }, err => {
          console.log(err);
          reject(err);
        });
    });
  }

}
