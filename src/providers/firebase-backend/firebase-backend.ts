import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';


@Injectable()
export class FirebaseBackendProvider {

  apiUrl = 'http://us-central1-marinetelmatics.cloudfunctions.net';
  headers = new HttpHeaders().set('Content-Type', 'application/json')
                         .append('Access-Control-Allow-Origin', '*')
                         .append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT')
                         .append('Accept', 'application/json');

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

  setLimits( boat ){
    return this.post('/limits', boat);
  }
  
  post( path, data ) {
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
