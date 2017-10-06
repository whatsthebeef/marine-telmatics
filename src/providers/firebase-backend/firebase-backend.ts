import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the FirebaseBackendProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseBackendProvider {
  apiUrl = 'http://us-central1-marinetelmatics.cloudfunctions.net';
  
  constructor(public http: HttpClient) {
    console.log('Hello FirebaseBackendProvider Provider');
  }

  login( data ) {
    
    return new Promise(resolve => {
      this.http.post(this.apiUrl+'/login',
                     JSON.stringify( data ),
                    {
                       headers: new HttpHeaders().set('Content-type',
                                                 'application/json')
                    }
          )
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          console.log(err);
        });
    });
  }
  
}
