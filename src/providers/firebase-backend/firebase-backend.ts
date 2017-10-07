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

  login( data ) {
    return this.post('/login', data);
  }

  register( data ) {
    return this.post('/register', data);
  }

  boat( imei ) {
    return this.get('/boat?imei='+imei);
  }
  
  post( path, data ) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+path, data, { headers:this.header })
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
      this.http.get(this.apiUrl+path, { headers:this.header })
        .subscribe(data => {
          resolve(data);
        }, err => {
          console.log(err);
          reject(err);
        });
    });
  }
}
