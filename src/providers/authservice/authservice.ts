import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
 
export class User {
  name: string;
  email: string;
 
  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}
 
@Injectable()
export class AuthService {
  currentUser: User;
 
  public login(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        // At this point make a request to your backend to make a real check!
        let access = (credentials.password === "pass" && credentials.email === "admin@test.com");
        this.currentUser = new User('Admin', 'admin@test.com');
        observer.next(access);
        observer.complete();
      });
    }
  }
 
  public register(credentials) {
   // console.log(credentials);
    if (credentials.firstname === null || credentials.email === null || credentials.password === null || credentials.confirmpass === null) {
      return Observable.throw("Please insert credentials");
    }
    // else if(credentials.password != credentials.confirmpass)
    // {
      
    //   return Observable.throw("Password does not match");
    // } 
    else {
      // At this point store the credentials to your backend!
      //console.log(credentials);
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }
 
  public getUserInfo() : User {
    return this.currentUser;
  }
 
  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }
}